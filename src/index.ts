/**
    This handler is basically a middleware.
    It will be called for every request in our site.
    Make sure to call next() as it will pass the request to the next handler.
    
    In development, flow is: handler -> vite middlewares
    In production, flow is: serve static files -> handler -> index.html

    For more information, check the repo at:
    https://github.com/egoist/vite-plugin-mix
    
    Note: This is a small project, we may have to improvise but this allows our
    project to be simplier and easier to maintain. We're not sure how this will
    compromise performance. We'll see how it goes.

    By: Coffee
    Date: 9/6/2024 12:00 AM
 */

// this is basically an empty signature in base64
const invalidSignature = "data:image/png;base64,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";

interface PlayerData {
    id: number;
    username: string;
    name: string;
    email: string;
    student_id: string;
    top_score: number;
    is_facilitator: boolean;
    course: string;
    section: string;
    code: string;
}

import * as fs from 'fs';
import * as path from 'path';

import express, { type Request, type Response } from 'express'
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import { Database } from "bun:sqlite";

const app = express()

export const handler = app

const corsOptions = {
    origin: 'http://localhost:5173', // allowed origin, this is our client
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // allowed methods
    credentials: true, // allow credentials (cookies, etc.)
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next) => {

    if (req.url.startsWith('/api/v1/')) {
        let apiDebInfo =
            'API Request From \'' + req.headers['host'] + '\' -> ' + req.method + ' ' + req.originalUrl + '';

        console.log(apiDebInfo);
    }

    next()
});

/**
 * this route verifies code that the user has given us.
 * if the code is valid, we will return the user's data
 * and set the user's session cookie.
 * 
 * the session cookie will then be linked to the user's data
 * and their code. it will then be saved via database.
 *
 * in short, this logins a player.
 */
app.post('/api/v1/player/verifyCode', (req: Request, res: Response) => {

    res.setHeader('Content-Type', 'application/json');

    let code = req.body.code;
    if (!code) {
        let responseJson =
        {
            status: 'invalid',
            message: 'Code is invalid.',
        };

        return res.end(JSON.stringify(responseJson));
    }

    let playerData = getPlayerWithCode(code) as PlayerData;
    if (!playerData) {
        let responseJson =
        {
            status: 'invalid',
            message: 'Code is invalid.',
        };

        return res.end(JSON.stringify(responseJson));
    }

    let responseJson =
    {
        status: 'verified',
        message: 'Code is valid.',
        user_data: playerData
    };

    console.log('Code: ' + playerData.code);

    res.cookie('JPCS_SESSION_TOKEN', playerData.code, { httpOnly: true });

    return res.end(JSON.stringify(responseJson));
});

/**
 * this route registers a user to db and returns a code
 * this should only be used by admin.
 * 
 * the user's data will be saved to the database.
 */
app.post('/api/v1/player/register', (req: Request, res: Response) => {

    // to make sure only us can register a user, this should be in a .env file shared with the tap-id client
    let authToken = req.body.authentication;
    if (!authToken) {
        let responseJson =
        {
            status: 'invalid',
            message: 'Invalid request.',
        };

        return res.end(JSON.stringify(responseJson));
    }

    let studentId = req.body.student_id;
    if (!studentId) {
        let responseJson =
        {
            status: 'invalid',
            message: 'Student ID is required.',
        };

        return res.end(JSON.stringify(responseJson));
    }

    let fullName = req.body.full_name;
    if (!fullName) {
        let responseJson =
        {
            status: 'invalid',
            message: 'Full name is required.',
        };

        return res.end(JSON.stringify(responseJson));
    }

    let email = req.body.email;
    if (!email) {
        let responseJson =
        {
            status: 'invalid',
            message: 'Email is required.',
        };

        return res.end(JSON.stringify(responseJson));
    }

    if (isEmailExists(email))
    {
        let responseJson =
        {
            status: 'invalid',
            message: 'Email already exists.',
        };

        return res.end(JSON.stringify(responseJson));
    }

    let course = req.body.course;
    if (!course) {
        let responseJson =
        {
            status: 'invalid',
            message: 'Course is required.',
        };

        return res.end(JSON.stringify(responseJson));
    }

    let section = req.body.section;
    if (!section) {
        let responseJson =
        {
            status: 'invalid',
            message: 'Section is required.',
        };

        return res.end(JSON.stringify(responseJson));
    }

    let code: string;
    do {
        code = generateCode();
    } while (isCodeExists(code));

    // this is the first name btw
    let username = email.split('@')[0].split('_')[0].charAt(0).toUpperCase() + email.split('@')[0].split('_')[0].slice(1);
    
    // insert to db
    insertPlayerData(code, studentId, username, fullName, email, course, section);

    let responseJson =
    {
        status: 'verified',
        message: 'User registered.',
        code: code
    };

    return res.end(JSON.stringify(responseJson));
});

/**
 * if player has session token as cookie and refreshed the page, 
 * we will check if the token is valid and is registered.
 * we then return the player's data. 
 *
 * in short, this basically checks if player is logged in.
 */
app.post('/api/v1/player/checkToken', (req: Request, res: Response) => {

    res.setHeader('Content-Type', 'application/json');

    // check if user has our session token
    var token = req.cookies['JPCS_SESSION_TOKEN'];
    if (!token) {
        let responseJson =
        {
            status: 'invalid',
            message: 'Token is invalid.',
        };

        return res.end(JSON.stringify(responseJson));
    }

    let playerData = getPlayerWithCode(token) as PlayerData;
    if (!playerData) {
        let responseJson =
        {
            status: 'invalid',
            message: 'Token is invalid.',
        };

        return res.end(JSON.stringify(responseJson));
    }

    let responseJson =
    {
        status: 'verified',
        message: 'Token is valid.',
        user_data: playerData
    };

    return res.end(JSON.stringify(responseJson));
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port ' + (process.env.PORT || 3000));
});

app.post('/api/v1/player/signatureCheck', async (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');

    const token = req.cookies['JPCS_SESSION_TOKEN'];
    if (!token) {
        const responseJson = {
            status: 'no_sign',
            message: 'Player has no signature.',
        };
        return res.end(JSON.stringify(responseJson));
    }

    try {
      
        const fullEmail = await getPlayerEmailWithCode(token) as string;
        if (!fullEmail) {
            const responseJson = {
                status: 'no_sign',
                message: 'Player has no signature.',
            };
            return res.end(JSON.stringify(responseJson));
        }
    
        const email = fullEmail.split('@')[0];
        const signaturePath = path.join('signatures', `${email}.png`);

        await fs.promises.access(signaturePath, fs.constants.F_OK);

        const responseJson = {
            status: 'signed',
            message: 'Player has signed.',
        };
        return res.end(JSON.stringify(responseJson));
    } catch (error) {
    
        const responseJson = {
            status: 'no_sign',
            message: 'Player has no signature.',
        };
        return res.end(JSON.stringify(responseJson));
    }
});

app.post('/api/v1/player/submitSignature', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');

    // check if user has our session token
	var token = req.cookies['JPCS_SESSION_TOKEN'];
    if (!token)
	{
        let responseJson = 
        {
            status: 'invalid',
            message: 'Player signature invalid.',
        };

        return res.end(JSON.stringify(responseJson));   
    }

    const signatureBase64 = req.body.signatureBase64;
    if (!signatureBase64)
    {
        let responseJson = 
        {
            status: 'invalid',
            message: 'Player signature invalid.',
        };

        return res.end(JSON.stringify(responseJson));
    }

    if (signatureBase64 == invalidSignature)
    {
        let responseJson = 
        {
            status: 'invalid',
            message: 'Player signature invalid.',
        };

        return res.end(JSON.stringify(responseJson));
    }

    const email = getPlayerEmailWithCode(token) as string;
    if (!email)
    {
        let responseJson = 
        {
            status: 'invalid',
            message: 'Player non-existent.',
        };

        return res.end(JSON.stringify(responseJson));
    }

    const signatureFileName = `${email.split('@')[0]}.png`;

    if (fs.existsSync(path.join('signatures', signatureFileName)))
    {
        let responseJson = 
        {
            status: 'invalid',
            message: 'Player signature already exists.',
        };

        return res.end(JSON.stringify(responseJson));
    }

    if (!saveBase64Image(signatureBase64, path.join('signatures', signatureFileName)))
    {
        let responseJson = 
        {
            status: 'invalid',
            message: 'Server error. Failed to encode signature.',
        };

        return res.end(JSON.stringify(responseJson));
    }

    let responseJson = 
    {
        status: 'verified',
        message: 'Player signature verified.',
    };

    return res.end(JSON.stringify(responseJson));
});

// bun's built-in sqlite database
const db = new Database("database.sqlite");

// create STUDENTS table and insert column if nonexist 
db.exec(`
        CREATE TABLE IF NOT EXISTS STUDENTS (  
        player_id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id INTEGER UNIQUE, 
        code TEXT UNIQUE NOT NULL,
        username TEXT DEFAULT 'No_Username',
        full_name TEXT DEFAULT 'No_Full_Name',
        email TEXT UNIQUE NOT NULL,
        course TEXT DEFAULT 'No_Course',
        section TEXT DEFAULT 'No_Section',
        is_facilitator BOOLEAN DEFAULT FALSE,
        top_score INTEGER DEFAULT 0
    );
`);





/** helper functions for those above */

/**
 * NOTE: We can use sqlite for this project.
 * an alternative would be sql or mariadb but that would be overkill.
 * or we can just store it in ram, but risk losing data in a crash etc.
 * or store it in bin files. i would do it but that would be overkill too. 
 * though i think, some hosting providers allow free sql database for a week or so.
 * so sql it is?
 */

export const isCodeExists = (code: string): boolean => {

    interface CountResult {
        count: number;
    }

    let stmt = db.prepare("SELECT COUNT(*) AS count FROM STUDENTS WHERE code = ?");
    let result = stmt.get(code) as CountResult;
    return result.count > 0;
}

// valid characters
const CODE_POINTS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"

// generate 4 letter capitalized code. make sure to check db if it's unique.
// and don't forget to link this to a specific user.
export const generateCode = () => {
    // tyron can do this :DD

    // LUHN's mod n algorithm
    // https://en.wikipedia.org/wiki/Luhn_mod_N_algorithm

    const code = generateHumanReadableCode(6);

    let factor = 2;
    let sum = 0;
    let n = CODE_POINTS.length;

    // Starting from the right and working leftwards is easier since
    // the initial "factor" will always be "2"

    for (let i = code.length - 1; i >= 0; i--) {
        let codePoint = CODE_POINTS.indexOf(code.charAt(i));
        let addend = factor * codePoint;

        // Alternate the "factor" that each "codePoint" is multiplied by
        factor = (factor == 2) ? 1 : 2;

        // Sum the digits of the "addend" as expressed in base "n"
        addend = Math.floor(addend / n) + (addend % n);
        sum += addend;
    }

    // Calculate the number that must be added to the "sum"
    // to make it divisible by "n".
    const remainder = sum % n;
    const checkCodePoint = (n - remainder) % n;

    const checkCharacter = CODE_POINTS.charAt(checkCodePoint);

    return code + checkCharacter;
}

const generateHumanReadableCode = (length: number) => {
    const string = [];

    // base 36
    for (let i = 0; i < length; i++) {
        string.push(CODE_POINTS.charAt(Math.floor(Math.random() * 36)));
    }

    return string.join('');
}

// get user data from db, perform prepared sql statements here.
// either of param code or token should be valid
const getPlayerDataFromDB = (code: string, token: string) => {
    // don't use this directly for routes, use checkCode or checkToken instead.
    // for safety reasons. since codes or tokens have their own different parsing
    // kinemerut
}

const isEmailExists = (email: string) => {

    interface CountResult {
        count: number;
    }

    let stmt = db.prepare("SELECT COUNT(*) AS count FROM STUDENTS WHERE email = ?");
    let result = stmt.get(email) as CountResult;
    return result.count > 0;
}

const insertPlayerData = (code: string, student_id: number, username: string, fullName: string, email: string, course: string, section: string) => {
    // insert player and handle errors here

    let stmt = db.prepare("INSERT INTO STUDENTS (code, student_id, username, full_name, email, course, section) VALUES (?, ?, ?, ?, ?, ?, ?)");
    stmt.run(code, student_id, username, fullName, email, course, section);
}

// tyron, you decide. should we use token as main key or student id?
// which is more secure in this case?
const updatePlayerScore = (token: string) => {
}

export const isCodeValid = (code: string) => {
     // let data = getUserData(code, null);
    // if (!data) return null;

    // code length should be 6 + 1 (check character)
    if (code.length != 7) return false;

    let factor = 1;
    let sum = 0;
    let n = CODE_POINTS.length;

    // Starting from the right, work leftwards
    // Now, the initial "factor" will always be "1"
    // since the last character is the check character.
    for (let i = code.length - 1; i >= 0; i--) {
        let codePoint = CODE_POINTS.indexOf(code.charAt(i));
        let addend = factor * codePoint;

        // Alternate the "factor" that each "codePoint" is multiplied by
        factor = (factor == 2) ? 1 : 2;

        // Sum the digits of the "addend" as expressed in base "n"
        addend = (Math.floor(addend / n)) + (addend % n);
        sum += addend;
    }

    let remainder = sum % n;
    return remainder == 0;
}

// check if code is valid, returns true if valid, false if not.
export const getPlayerWithCode = (code: string) => {

    if (!isCodeValid(code)) return null;

    let stmt = db.prepare("SELECT * FROM STUDENTS WHERE code = ?");
    let result = stmt.get(code);

    return result as PlayerData;
}

export const getPlayerEmailWithCode = (code: string) => {
    
    if (!isCodeValid(code)) return null;

    let stmt = db.prepare("SELECT email FROM STUDENTS WHERE code = ?");
    let result = stmt.get(code) as { email: string };

    return result.email;
}

const saveBase64Image = (base64Data: string, filePath: string): boolean => {
  
    const base64Pattern = /^data:image\/png;base64,/;
    const base64Image = base64Data.replace(base64Pattern, '');

    const buffer = Buffer.from(base64Image, 'base64');

    try {
        fs.writeFile(filePath, buffer, (err) => {
            if (err) {
                console.error('Error saving the image:', err);
                return false;
            } else {
                console.log('Image saved successfully to', filePath);
            }

            
        });

        return true;
    } catch (error) {
        console.error('Error saving the image:', error);
    }

    return false;
};