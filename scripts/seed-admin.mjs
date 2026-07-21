import { applicationDefault, cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { readFile } from 'node:fs/promises';

const projectId = 'nozomi-website-9d906';
const adminEmail = 'admin@nozomicare.vn';
const password = process.env.ADMIN_PASSWORD;

if (!password) {
  console.error("ADMIN_PASSWORD is required. Example: ADMIN_PASSWORD='Admin123!' npm run seed:admin");
  process.exit(1);
}

if (password.length < 6) {
  console.error('ADMIN_PASSWORD must be at least 6 characters.');
  process.exit(1);
}

const credential = process.env.GOOGLE_APPLICATION_CREDENTIALS
  ? cert(JSON.parse(await readFile(process.env.GOOGLE_APPLICATION_CREDENTIALS, 'utf8')))
  : applicationDefault();

const app = getApps()[0] ?? initializeApp({ credential, projectId });
const auth = getAuth(app);

let user;
try {
  user = await auth.getUserByEmail(adminEmail);
  user = await auth.updateUser(user.uid, {
    password,
    displayName: 'Admin',
    disabled: false,
  });
  console.log('Updated the existing password administrator.');
} catch (error) {
  if (error?.code !== 'auth/user-not-found') throw error;
  user = await auth.createUser({
    email: adminEmail,
    password,
    displayName: 'Admin',
    emailVerified: true,
  });
  console.log('Created the password administrator.');
}

await getFirestore(app).collection('admins').doc(adminEmail).set({
  authType: 'password',
  username: adminEmail,
  uid: user.uid,
});

console.log(`Seeded Firestore admin record: admins/${adminEmail}`);
