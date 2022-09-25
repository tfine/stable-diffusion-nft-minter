/**
 * This is the main Node.js server script for your project
 * Check out the two endpoints this back-end API provides in fastify.get and fastify.post below
 */

const path = require("path");
const fetch = require("node-fetch");
const sleep = require("sleep-promise");

// Require the fastify framework and instantiate it
const fastify = require("fastify")({
  // Set this to true for detailed logging:
  logger: false,
});

// Setup our static files
fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "public"),
  prefix: "/", // optional: default '/'
});

// Formbody lets us parse incoming forms
fastify.register(require("@fastify/formbody"));

// View is a templating manager for fastify
fastify.register(require("@fastify/view"), {
  engine: {
    handlebars: require("handlebars"),
  },
});

// Load and parse SEO data
const seo = require("./src/seo.json");
if (seo.url === "glitch-default") {
  seo.url = `https://${process.env.PROJECT_DOMAIN}.glitch.me`;
}

/**
 * Our home page route
 *
 * Returns src/pages/index.hbs with data built into it
 */
fastify.get("/", async function (request, reply) {
  // params is an object we'll pass to our handlebars template
  let params = { seo: seo };
  
  // The Handlebars code will be able to access the parameter values and build them into the page
  return reply.view("/src/pages/index.hbs", params);
  
  
});

/**
 * Our POST route to handle and react to form submissions
 */
fastify.post("/", async function (request, reply) {

  // define async function for minting
  
    let transactioncheck = async function postData(url) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Authorization: `${process.env.NFTPORT}`,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    return response.json();
  };
  
  if (request.body.transaction) {
  var urlcheck = "https://api.covalenthq.com/v1/137/transaction_v2/" + request.body.transaction + "/?&key=" + process.env.COVALENT;
  var transactionstatus = await transactioncheck(urlcheck); 
  console.log(transactionstatus["data"]["items"][0]["successful"]);
  let params = {
      success: transactionstatus["data"]["items"][0]["successful"],
      blocksigned: transactionstatus["data"]["items"][0]["block_signed_at"]
  };
  // show page with new data
  return reply.view("/src/pages/index.hbs", params);
  }
    
  
  let mint = async function postData(url, data) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Authorization: `${process.env.NFTPORT}`,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    console.log(response);
    return response.json();
  };

  // if an image is included in the POST data, mint the NFT
  if (request.body.name) {
    let urladdress = request.body.url;
    let name = request.body.name;
    let description = request.body.description;
    let wallet = request.body.wallet;
    let minted = await mint("https://api.nftport.xyz/v0/mints/easy/urls", {
      chain: "polygon",
      name: `${name}`,
      description: `${description}`,
      file_url: `${urladdress}`,
      mint_to_address: `${wallet}`,
    });
    console.log(minted);
    if (`${minted["response"]}` == 'OK')
    {
      
    
    let params = {
      mintedhash: `${minted["transaction_hash"]}`,
      mintedurl: `${minted["transaction_external_url"]}`,
      minteddescription: `${minted["description"]}`,
      mintedtitle: `${minted["name"]}`,
      mintedfile: `${urladdress}`,
      mintedaddress: `${minted["transaction_external_url"]}`
    }
    // show page with new data
    return reply.view("/src/pages/index.hbs", params);
  }
  }// else do stable diffusion
  else {
    console.log("new process for:");
    let label = request.body.prompt;
    console.log(label);

    // define initial stable diffusion request for replicate
    let firstrequest = async function postData(url, data) {
      // Default options are marked with *
      const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${process.env.REPLICATE}`,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
      console.log(response);
      return response.json();
    };

    // define second stable diffusion request to check status
    let secondrequest = async function getData(url) {
      // Default options are marked with *
      const response = await fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${process.env.REPLICATE}`,
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      });
      return response.json();
    };

    console.log("REQUEST IMAGE");
    let firstrequestresult = await firstrequest("https://api.replicate.com/v1/predictions", {
      version:
        "a9758cbfbd5f3c2094457d996681af52552901775aa2d6dd0b17fd15df959bef",
      input: { prompt: `${label}`, num_inference_steps: "70" },
    });

    console.log("CHECK POSTED URL");
    let url2 = await firstrequestresult["urls"]["get"];

    console.log(url2);

    console.log("WAIT FOR PROCESSING");
    await sleep(10000);

    let secondrequestresult = await secondrequest(url2);

    console.log(secondrequestresult);

    // check if error in processing
    if (secondrequestresult["status"] !== "succeeded") {
      console.log("not ready");
      let params = {
      status: "not ready",
      };
      return reply.view("/src/pages/index.hbs", params);
    }

    // Now we see if that color is a key in our colors object
    let params = {
      article: `${secondrequestresult["output"][0]}`,
      title: `${label}`,
    };

    // show page with new data
    return reply.view("/src/pages/index.hbs", params);
  }
});

// Run the server and report out to the logs
fastify.listen(
  { port: process.env.PORT, host: "0.0.0.0" },
  function (err, address) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    console.log(`Your app is listening on ${address}`);
    fastify.log.info(`server listening on ${address}`);
  }
);
