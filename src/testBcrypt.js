const bcrypt = require("bcrypt");

async function test() {

    const password = "MyPassword123";

    const hash = await bcrypt.hash(password, 10);

    const isMatch = await bcrypt.compare(
        password,
        hash
    );

    console.log("Password Matches:", isMatch);

}

test();