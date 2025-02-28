




export const generatePassword = () => {
    const passGenChars = `ABCDEFGHIJKLMNOPRSTUVYZ1234567890`
    let pass = "";
    for(let i = 0; i < 5; i++) pass += passGenChars[Math.floor(Math.random() * passGenChars.length)];

    return pass;
}


