console.log("\n");
console.log('\x1b[31m%s\x1b[0m', ' ▄▄▄     ▓██   ██▓ ██░ ██  █    ██      ██████  ███▄    █  ██▓ ██▓███  ▓█████  ██▀███  ');
console.log('\x1b[31m%s\x1b[0m', '▒████▄    ▒██  ██▒▓██░ ██▒ ██  ▓██▒   ▒██    ▒  ██ ▀█   █ ▓██▒▓██░  ██▒▓█   ▀ ▓██ ▒ ██▒');
console.log('\x1b[31m%s\x1b[0m', '▒██  ▀█▄   ▒██ ██░▒██▀▀██░▓██  ▒██░   ░ ▓██▄   ▓██  ▀█ ██▒▒██▒▓██░ ██▓▒▒███   ▓██ ░▄█ ▒');
console.log('\x1b[31m%s\x1b[0m', '░██▄▄▄▄██  ░ ▐██▓░░▓█ ░██ ▓▓█  ░██░     ▒   ██▒▓██▒  ▐▌██▒░██░▒██▄█▓▒ ▒▒▓█  ▄ ▒██▀▀█▄  ');
console.log('\x1b[31m%s\x1b[0m', ' ▓█   ▓██▒ ░ ██▒▓░░▓█▒░██▓▒▒█████▓    ▒██████▒▒▒██░   ▓██░░██░▒██▒ ░  ░░▒████▒░██▓ ▒██▒');
console.log('\x1b[31m%s\x1b[0m', ' ▒▒   ▓▒█░  ██▒▒▒  ▒ ░░▒░▒░▒▓▒ ▒ ▒    ▒ ▒▓▒ ▒ ░░ ▒░   ▒ ▒ ░▓  ▒▓▒░ ░  ░░░ ▒░ ░░ ▒▓ ░▒▓░');
console.log('\x1b[31m%s\x1b[0m', '  ▒   ▒▒ ░▓██ ░▒░  ▒ ░▒░ ░░░▒░ ░ ░    ░ ░▒  ░ ░░ ░░   ░ ▒░ ▒ ░░▒ ░      ░ ░  ░  ░▒ ░ ▒░');
console.log('\x1b[31m%s\x1b[0m', '  ░   ▒   ▒ ▒ ░░   ░  ░░ ░ ░░░ ░ ░    ░  ░  ░     ░   ░ ░  ▒ ░░░          ░     ░░   ░ ');
console.log('\x1b[31m%s\x1b[0m', '      ░  ░░                                                                            ');
console.log('\x1b[31m%s\x1b[0m', '                               > Ayhu#0069                                             \n');
console.log('\x1b[31m%s\x1b[0m', '                               > https://github.com/Ayhuuu                             \n');


const readline = require("readline");
const request = require("request");
const delay = require("delay");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("\x1b[36m> Your Account Token:\x1b[0m ", (token) => {
  rl.question("\x1b[36m> Your Server ID:\x1b[0m ", (guildId) => {
    rl.question("\x1b[36m> Discord webhook URL:\x1b[0m ", (webhookUrl) => {
      rl.question("\x1b[36m> Vanity URL:\x1b[0m ", (vanityUrl) => {
        const headers = {
          "authorization": token,
          "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36"
        };

        async function checkVanity() {
          while (true) {
            try {
              if (vanityUrl === "") {
                console.log('\x1b[36m%s\x1b[0m',"> Vanity URL is empty, waiting for a new URL...");
              } else {
                request.get({
                  url: `https://discord.com/api/v9/invites/${vanityUrl}?with_counts=true&with_expiration=true`,
                  headers: headers
                }, (error, response, body) => {
                  if (response && response.statusCode == 404) {
                    console.log('\x1b[36m%s\x1b[0m',`> Changing Vanity URL: ${vanityUrl}`);
                    changeVanity();
                  } else {
                    console.log('\x1b[36m%s\x1b[0m',`> Vanity URL still active: ${vanityUrl}`);
                  }
                });
              }
              await delay(200);
            } catch (error) {
              console.log('\x1b[31m%s\x1b[0m', "> Rate limited :(");
              await delay(5000);
            }
          }
        }

        function changeVanity() {
          const payload = { "code": vanityUrl };
          request.patch({
            url: `https://discord.com/api/v10/guilds/${guildId}/vanity-url`,
            headers: headers,
            json: payload
          }, (error, response, body) => {
            if (response.statusCode == 200) {
              console.log('\x1b[36m%s\x1b[0m',`> URL changed: ${vanityUrl}`);
              const data = {
                content: `@everyone discord.gg/${vanityUrl} yours now!`,
                username: "Ayhu",
                avatar_url: "https://cdn.discordapp.com/attachments/1078000713914921043/1084384416228454460/lol.png"
              };      
              request.post({
                url: webhookUrl,
                json: data
              }, () => {
                process.exit(); 
              });
            } else {
              console.log('\x1b[36m%s\x1b[0m',`> Vanity URL could not be changed, error code: ${response.statusCode}`);
            }
          });
        }

        checkVanity();
      });
    });
  });
});
