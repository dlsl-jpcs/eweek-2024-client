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

import { getStudentInfo, parseNameFromDlslEmail } from './util';

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fhxedvdhloxnnyvjtdfk.supabase.co'
const supabaseKey = Bun.env.SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey)

// sign in anonymously
supabase.auth.signInAnonymously().then(() => {
    console.log('Signed in anonymously');
});

const app = express()


export const handler = app

const corsOptions = {
    origin: ['http://localhost:5173', "https://eweek-2024-server.onrender.com", "https://dlsl-jpcs.github.io"], // allowed origin, this is our client
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
            `API Request From \'${req.headers['host']}\' -> ${req.method} ${req.originalUrl}`;

        console.log(apiDebInfo);
    }

    next()
});

app.get('/', (req: Request, res: Response) => {

    return res.sendFile(path.join(__dirname, 'public/server.html'));
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
app.post('/api/v1/player/verifyCode', async (req: Request, res: Response) => {

    res.setHeader('Content-Type', 'application/json');

    let code = req.body.code;
    if (!code) {
        let responseJson =
        {
            status: 'invalid',
            message: 'Code is invalid.',
        };

        return res.send(JSON.stringify(responseJson));
    }

    let playerDataResponse = await getPlayerWithCode(code);
    if (!playerDataResponse) {
        let responseJson =
        {
            status: 'invalid',
            message: 'Code is invalid.',
        };

        return res.send(JSON.stringify(responseJson));
    }

    const playerData = playerDataResponse as PlayerData;

    let responseJson =
    {
        status: 'verified',
        message: 'Code is valid.',
        user_data: playerData
    };

    console.log('Code: ' + playerData.code);

    res.cookie('JPCS_SESSION_TOKEN', playerData.code, { httpOnly: true });

    return res.send(JSON.stringify(responseJson));
});

/**
 * this route registers a user to db and returns a code
 * this should only be used by admin.
 * 
 * the user's data will be saved to the database.
 */
app.post('/api/v1/player/register', async (req: Request, res: Response) => {

    // to make sure only us can register a user, this should be in a .env file shared with the tap-id client
    // TODO: Coffee

    // let authToken = req.body.authentication;
    // if (!authToken) {
    //     let responseJson =
    //     {
    //         status: 'invalid',
    //         message: 'Invalid request.',
    //     };

    //     return res.send(JSON.stringify(responseJson));
    // }



    let studentId = req.body.student_id;
    if (!studentId) {
        let responseJson =
        {
            status: 'invalid',
            message: 'Student ID is required.',
        };

        return res.send(JSON.stringify(responseJson));
    }

    const codeResult = await getCodeForStudentId(studentId);
    if (codeResult) {
        return res.send(JSON.stringify({
            status: 'user_already_exists',
            code: await getCodeForStudentId(studentId),
        }));
    }



    const info = await getStudentInfo(studentId).catch(() => null);
    if (!info) {
        let responseJson =
        {
            status: 'invalid',
            message: 'Student ID is invalid.',
        };

        return res.send(JSON.stringify(responseJson));
    }

    let fullName = parseNameFromDlslEmail(info.email_address);
    let email = info.email_address;

    if (await isEmailExists(email)) {
        console.log('User already exists', email);
        let responseJson =
        {
            status: 'user_already_exists',
            code: getCodeForStudentId(studentId),
        };

        return res.send(JSON.stringify(responseJson));
    }

    let course = info.department;

    // not provided by tap-id
    let section = "No_Section";

    let code: string;
    do {
        code = generateCode();
    } while (await isCodeExists(code));

    // this is the first name btw
    let username = email.split('@')[0].split('_')[0].charAt(0).toUpperCase() + email.split('@')[0].split('_')[0].slice(1);

    // insert to db
    const response = await insertPlayerData(code, studentId, username, fullName, email, course, section);
    if (response.error) {
        let responseJson =
        {
            status: 'invalid',
            message: 'Failed to register user.',
        };

        return res.send(JSON.stringify(responseJson));
    }

    let responseJson =
    {
        status: 'verified',
        message: 'User registered.',
        code: code
    };

    return res.send(JSON.stringify(responseJson));
});

/**
 * if player has session token as cookie and refreshed the page, 
 * we will check if the token is valid and is registered.
 * we then return the player's data. 
 *
 * in short, this basically checks if player is logged in.
 */
app.post('/api/v1/player/checkToken', async (req: Request, res: Response) => {
    console.log('Checking token...');

    res.setHeader('Content-Type', 'application/json');

    console.log(req.cookies);

    // check if user has our session token
    var token = req.cookies['JPCS_SESSION_TOKEN'];
    if (!token) {
        let responseJson =
        {
            status: 'invalid',
            message: 'No token provided.',
        };

        return res.send(JSON.stringify(responseJson));
    }

    let playerDataResponse = await getPlayerWithCode(token);
    if (!playerDataResponse) {
        let responseJson =
        {
            status: 'invalid',
            message: 'No player data found for token.',
        };

        return res.send(JSON.stringify(responseJson));
    }

    const playerData = playerDataResponse;

    let responseJson =
    {
        status: 'verified',
        message: 'Token is valid.',
        user_data: playerData
    };

    return res.send(JSON.stringify(responseJson));
});

app.listen(process.env.PORT || 3000, async () => {
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
        return res.send(JSON.stringify(responseJson));
    }

    try {

        const fullEmail = await getPlayerEmailWithCode(token) as string;
        if (!fullEmail) {
            const responseJson = {
                status: 'no_sign',
                message: 'Player has no signature.',
            };
            return res.send(JSON.stringify(responseJson));
        }

        const email = fullEmail.split('@')[0];

        const signatureFileName = `${email}.png`;

        const result = await supabase.storage.from('signatures').exists(signatureFileName);
        if (result.error || !result.data) {
            const responseJson = {
                status: 'no_sign',
                message: 'Player has no signature.',
            };
            return res.send(JSON.stringify(responseJson));
        }

        const responseJson = {
            status: 'signed',
            message: 'Player has signed.',
        };
        return res.send(JSON.stringify(responseJson));
    } catch (error) {

        const responseJson = {
            status: 'no_sign',
            message: 'Player has no signature.',
        };
        return res.send(JSON.stringify(responseJson));
    }
});

app.post('/api/v1/player/submitSignature', async (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');

    // check if user has our session token
    var token = req.cookies['JPCS_SESSION_TOKEN'];
    if (!token) {
        let responseJson =
        {
            status: 'invalid',
            message: 'Player signature invalid.',
        };

        return res.send(JSON.stringify(responseJson));
    }

    const signatureBase64 = req.body.signatureBase64;
    if (!signatureBase64) {
        let responseJson =
        {
            status: 'invalid',
            message: 'Player signature invalid.',
        };

        return res.send(JSON.stringify(responseJson));
    }

    const emailResponse = await getPlayerEmailWithCode(token);
    if (!emailResponse) {
        let responseJson =
        {
            status: 'invalid',
            message: 'Player non-existent.',
        };

        return res.send(JSON.stringify(responseJson));
    }

    const signatureFileName = `${emailResponse.split('@')[0]}.png`;

    if (fs.existsSync(path.join('signatures', signatureFileName))) {
        let responseJson =
        {
            status: 'invalid',
            message: 'Player signature already exists.',
        };

        return res.send(JSON.stringify(responseJson));
    }


    if (! await saveBase64Image(signatureBase64, signatureFileName)) {
        let responseJson =
        {
            status: 'invalid',
            message: 'Server error. Failed to encode signature.',
        };

        return res.send(JSON.stringify(responseJson));
    }

    let responseJson =
    {
        status: 'verified',
        message: 'Player signature verified.',
    };

    return res.send(JSON.stringify(responseJson));
});



export const getCodeForStudentId = async (student_id: string) => {
    const response = await supabase.from('Students').select('code').eq('student_id', student_id).single();
    if (response.error) {
        return null;
    }



    return response.data.code;
}


/** helper functions for those above */

/**
 * NOTE: We can use sqlite for this project.
 * an alternative would be sql or mariadb but that would be overkill.
 * or we can just store it in ram, but risk losing data in a crash etc.
 * or store it in bin files. i would do it but that would be overkill too. 
 * though i think, some hosting providers allow free sql database for a week or so.
 * so sql it is?
 */

export const isCodeExists = async (code: string) => {
    const count = await supabase.from('Students').select('code').eq('code', code).single();

    console.log("Count: ", count);
    if (count.data) {
        return true;
    }

    return false;
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

const isEmailExists = async (email: string) => {

    const result = await supabase.from('Students').select('email').eq('email', email).single();

    if (result.error) {
        return false;
    }

    if (result.data) {
        return true;
    }

    return true;
}

const insertPlayerData = async (code: string, student_id: number, username: string, fullName: string, email: string, course: string, section: string) => {
    // insert player and handle errors here
    return supabase.from('Students').insert({
        code: code,
        student_id: student_id,
        username: username,
        full_name: fullName,
        email: email,
        course: course,
        section: section,
    });
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
export const getPlayerWithCode = async (code: string) => {
    const response = await supabase.from('Students').select('*').eq('code', code).single();
    if (response.error) {
        return false;
    }

    return response.data as PlayerData;
}

export const getPlayerEmailWithCode = async (code: string) => {

    if (!isCodeValid(code)) return null;

    const result = await supabase.from('Students').select('email').eq('code', code).single();
    if (result.error) return null;

    return result.data.email;
}

const saveBase64Image = async (base64Data: string, filePath: string) => {

    const base64Pattern = /^data:image\/png;base64,/;
    const base64Image = base64Data.replace(base64Pattern, '');

    const buffer = Buffer.from(base64Image, 'base64');

    const result = await supabase.storage.from('signatures').upload(filePath, buffer);
    if (result.error) {
        console.error(result.error);
        return false;
    }

    return true;
};