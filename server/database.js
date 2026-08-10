import mssql from 'mssql/msnodesqlv8.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const dbName = process.env.DB_NAME || 'pbts_db';
const rawServer = process.env.DB_SERVER || '.\\SQLEXPRESS';
const dbServer = rawServer.replace(/\\\\+/g, '\\');
const dbUser = process.env.DB_USER || '';
const dbPassword = process.env.DB_PASSWORD || '';
const trustServerCert = process.env.DB_TRUST_SERVER_CERTIFICATE !== 'false';

let pool = null;
let poolPromise = null;

function getConnectionString(targetDb = dbName) {
  if (dbUser && dbPassword) {
    return `Driver={SQL Server};Server=${dbServer};Database=${targetDb};Uid=${dbUser};Pwd=${dbPassword};TrustServerCertificate=${trustServerCert ? 'yes' : 'no'};`;
  }
  return `Driver={SQL Server};Server=${dbServer};Database=${targetDb};Trusted_Connection=yes;TrustServerCertificate=${trustServerCert ? 'yes' : 'no'};`;
}

export async function getDbPool() {
  if (pool) return pool;

  if (!poolPromise) {
    poolPromise = (async () => {
      const connStr = getConnectionString(dbName);
      console.log(`[Database] Connecting to SQL Server Express database "${dbName}" on server "${dbServer}"...`);

      const newPool = new mssql.ConnectionPool({
        connectionString: connStr,
        driver: 'msnodesqlv8',
      });

      try {
        await newPool.connect();
        console.log(`[Database] Connected successfully to SQL Server Express database "${dbName}"!`);
        await initializeTables(newPool);
        pool = newPool;
        return pool;
      } catch (err) {
        console.warn(`[Database] Connection note: ${err.message}`);
        pool = newPool;
        return pool;
      }
    })();
  }

  return poolPromise;
}

async function initializeTables(activePool) {
  await activePool.request().query(`
    IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'contact_submissions')
    BEGIN
      CREATE TABLE contact_submissions (
        id INT IDENTITY(1,1) PRIMARY KEY,
        first_name NVARCHAR(100) NOT NULL,
        last_name NVARCHAR(100) NOT NULL,
        email NVARCHAR(255) NOT NULL,
        contact_number NVARCHAR(50),
        message NVARCHAR(MAX) NOT NULL,
        status NVARCHAR(20) DEFAULT 'unread',
        created_at DATETIME DEFAULT GETDATE()
      );
    END
  `);

  await activePool.request().query(`
    IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'career_applications')
    BEGIN
      CREATE TABLE career_applications (
        id INT IDENTITY(1,1) PRIMARY KEY,
        first_name NVARCHAR(100) NOT NULL,
        last_name NVARCHAR(100) NOT NULL,
        gender NVARCHAR(20),
        email NVARCHAR(255) NOT NULL,
        phone NVARCHAR(50) NOT NULL,
        job_position NVARCHAR(150) NOT NULL,
        resume_filename NVARCHAR(255),
        resume_original_name NVARCHAR(255),
        status NVARCHAR(20) DEFAULT 'pending',
        created_at DATETIME DEFAULT GETDATE()
      );
    END
  `);

  console.log('[Database] Tables contact_submissions and career_applications ready.');
}

// Queries for Contact Submissions
export async function saveContactSubmission({ firstName, lastName, email, contactNumber, message }) {
  const activePool = await getDbPool();
  const result = await activePool
    .request()
    .input('firstName', mssql.NVarChar(100), firstName)
    .input('lastName', mssql.NVarChar(100), lastName)
    .input('email', mssql.NVarChar(255), email)
    .input('contactNumber', mssql.NVarChar(50), contactNumber || null)
    .input('message', mssql.NVarChar(mssql.MAX), message)
    .query(`
      INSERT INTO contact_submissions (first_name, last_name, email, contact_number, message)
      OUTPUT INSERTED.*
      VALUES (@firstName, @lastName, @email, @contactNumber, @message)
    `);

  return result.recordset[0];
}

export async function getContactSubmissions() {
  const activePool = await getDbPool();
  const result = await activePool.request().query(`
    SELECT * FROM contact_submissions ORDER BY created_at DESC
  `);
  return result.recordset;
}

// Queries for Career Applications
export async function saveCareerApplication({ firstName, lastName, gender, email, phone, jobPosition, resumeFilename, resumeOriginalName }) {
  const activePool = await getDbPool();
  const result = await activePool
    .request()
    .input('firstName', mssql.NVarChar(100), firstName)
    .input('lastName', mssql.NVarChar(100), lastName)
    .input('gender', mssql.NVarChar(20), gender || null)
    .input('email', mssql.NVarChar(255), email || null)
    .input('phone', mssql.NVarChar(50), phone)
    .input('jobPosition', mssql.NVarChar(150), jobPosition)
    .input('resumeFilename', mssql.NVarChar(255), resumeFilename || null)
    .input('resumeOriginalName', mssql.NVarChar(255), resumeOriginalName || null)
    .query(`
      INSERT INTO career_applications (first_name, last_name, gender, email, phone, job_position, resume_filename, resume_original_name)
      OUTPUT INSERTED.*
      VALUES (@firstName, @lastName, @gender, @email, @phone, @jobPosition, @resumeFilename, @resumeOriginalName)
    `);

  return result.recordset[0];
}

export async function getCareerApplications() {
  const activePool = await getDbPool();
  const result = await activePool.request().query(`
    SELECT * FROM career_applications ORDER BY created_at DESC
  `);
  return result.recordset;
}
