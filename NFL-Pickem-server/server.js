import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

/* Import Schema for managing MongoDB database communication with Mongoose */
import user from "./models/user";
import schedule from "./models/schedule";

import * as RSA_PRIVATE_KEY from "./config";
import * as constants from "./template-weeks";
import * as jwt from "jsonwebtoken";
import * as fs from "fs";

const path = require("path");
const port = process.env.PORT || 3200;
const app = express();
const apiRouter = express.Router();
const dbHost = "mongodb://localhost:27017/NFL-Pickem";
const dbHostDocker = "mongodb://database/NFL-Pickem"; // is hosting through docker

// const RSA_PRIVATE_KEY = fs.readFileSync("./config.secret");

/* Get Mongoose to use the global promise library */
mongoose.Promise = global.Promise;
mongoose.connect(dbHostDocker);

app.use(cors());
/* Manage size limits for POST/PUT requests */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));
/* Get the default connection 
var conection = mongoose.connection;
*/

/* Verify connection to MongoDB 
connection.once('open', () => {
  console.log('MongoDB database connection established successfully!');
});*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* API for user */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////
/* GET for all user records*/
/////////////////////////////////////////
apiRouter.route("/user").get((req, res) => {
  /* Use the gallery model and access Mongoose's API to
      retrieve ALL MongoDB documents whose displayed field
      has a value of true */
  console.log("Get for All User");
  user.find({}, (err, users) => {
    /* If we encounter an error log this to the console */
    if (err) {
      console.dir(err);
    }

    /* Send the retrieve documents based as JSON encoded
         data with the Router Response object */
    res.json(users);
  });
});

/////////////////////////////////////////
/* GET for a single user record*/
/////////////////////////////////////////
apiRouter.route("/user/:username").get((req, res) => {
  /* Use the gallery model and access Mongoose's API to
      retrieve ALL MongoDB documents whose displayed field
      has a value of true */
  console.log("Get for Single User");
  if (req.params.username) {
    var username = req.params.username;
    username = username.toLowerCase();
  }
  user.find({ username: username }, (err, users) => {
    /* If we encounter an error log this to the console */
    if (err) {
      console.dir(err);
    }

    /* Send the retrieve documents based as JSON encoded
         data with the Router Response object */
    res.json(users);
  });
});
/////////////////////////////////////////
/* GET for username to see if exists*/
/////////////////////////////////////////
apiRouter.route("/user/exists/:username").get((req, res) => {
  if (req.params.username) {
    var username = req.params.username;
    username = username.toLowerCase();
    user.find({ username: username }, (err, user) => {
      /* If we encounter an error log this to the console */
      if (err) {
        console.dir(err);
      }
      /* Send the retrieve documents based as JSON encoded
          data with the Router Response object */
      if (user.length > 0) {
        res.json(true);
      } else {
        res.json(false);
      }
    });
  } else {
    res.json(false);
  }
});
/////////////////////////////////////////
/* POST for newly created user*/
/////////////////////////////////////////
apiRouter.route("/user").post((req, res) => {
  /* Retrieve the posted data from the Request object and assign
      this to variables */
  console.log(req.body);
  var saveUser = new user({
    username: req.body.username.toLowerCase(),
    userweeks: constants.TEMPLATE,
    weekscore: 0,
    totalscore: 0,
    password: req.body.password
  });
  saveUser.save((err, result) => {
    /* If we encounter an error log this to the console*/
    if (err) {
      console.dir(err);
      res.sendStatus(500);
    }
    if (result) {
      /* Document was successfully created so send a JSON encoded
         success message back with the Router Response object */
      console.log("new user created");
      res.json({ message: "successful user create" });
    }
  });
});

/////////////////////////////////////////
/* POST for userweek score*/
/////////////////////////////////////////
apiRouter.route("/user/userweek/score").post((req, res) => {
  /* Retrieve the posted data from the Request object and assign
      this to variables */
  console.log("about to update the userweek scores........");
  console.log(req.body);
  user.collection.bulkWrite(req.body, (err, result) => {
    /* If we encounter an error log this to the console*/
    if (err) {
      console.dir(err);
      res.sendStatus(500);
    }
    if (result) {
      /* Document was successfully created so send a JSON encoded
         success message back with the Router Response object */
      console.log("userweek scores updated");
      res.json({ message: "successful userweek scores updated" });
    }
  });
});

/////////////////////////////////////////
/* DELETE of a user*/
/////////////////////////////////////////
apiRouter.route("/user/delete").post((req, res) => {
  /* Retrieve the posted data from the Request object and assign
      this to variables */
  console.log(req.body);
  if (req.body.username) {
    var username = req.body.username;
    username = username.toLowerCase();
  }
  user.deleteOne({ username: username }, (err, result) => {
    /* If we encounter an error log this to the console*/
    if (err) {
      console.dir(err);
      res.sendStatus(500);
    }
    if (result) {
      /* Document was successfully created so send a JSON encoded
         success message back with the Router Response object */
      console.log("user deleted");
      res.json({ message: "user deleted successfully" });
    }
  });
});

/////////////////////////////////////////
/* POST for update to user*/
/////////////////////////////////////////
apiRouter.route("/user/update").post((req, res) => {
  /* Retrieve the posted data from the Request object and assign
      this to variables */
  //var saveUser = new user({});
  console.log(req.body);
  user.updateOne(
    // { $and: [ {username: 'req.body.username.toLowerCase()'}, {'userweeks.week': 'req.body.week'}] },
    { username: req.body.username },
    { $set: { "userweeks.$[element].picks": req.body.picks } },
    { arrayFilters: [{ "element.week": { $eq: req.body.week } }] },
    (err, result) => {
      /* If we encounter an error log this to the console*/
      if (err) {
        console.dir(err);
        res.sendStatus(500);
      }
      if (result) {
        /* Document was successfully created so send a JSON encoded
          success message back with the Router Response object */
        res.json({ message: "successful user update" });
      }
    }
  );
});

/////////////////////////////////////////
/* POST to authenticate user*/
/////////////////////////////////////////
apiRouter.route("/user/authenticate").post((req, res) => {
  /* Use the gallery model and access Mongoose's API to
      retrieve ALL MongoDB documents whose displayed field
      has a value of true */
  console.log("Authenticate User login");
  user.find({ username: req.body.username }, (err, users) => {
    /* If we encounter an error log this to the console */
    if (err) {
      console.dir(err);
    }
    // Return if password is wrong
    if (req.body.password !== users[0].password) {
      // send status 401 Unauthorized
      res.sendStatus(401);
    } else {
      // If credentials are correct, return the user object
      const jwtBearerToken = jwt.sign(
        { username: req.body.username },
        RSA_PRIVATE_KEY.secret
      );
      console.log(jwtBearerToken);
      // set it in the HTTP Response body
      res.status(200).send({ token: jwtBearerToken });
    }
  });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* API for schedule */
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////
/* GET for all schedule records*/
/////////////////////////////////////////
apiRouter.route("/schedule").get((req, res) => {
  /* Use the gallery model and access Mongoose's API to
      retrieve ALL MongoDB documents whose displayed field
      has a value of true */
  console.log("Get Schedule");
  schedule.find({}, (err, schedule) => {
    /* If we encounter an error log this to the console */
    if (err) {
      console.dir(err);
    }

    /* Send the retrieve documents based as JSON encoded
         data with the Router Response object */
    res.json(schedule);
  });
});

/////////////////////////////////////////
/* POST for adding new game*/
/////////////////////////////////////////
apiRouter.route("/schedule/gameadd").post((req, res) => {
  /* Use the gallery model and access Mongoose's API to
      retrieve ALL MongoDB documents whose displayed field
      has a value of true */
  console.log("Adding game to schedule");
  schedule.update(
    { week: req.body.week.selectedweek },
    { $push: { games: req.body.game } },
    (err, result) => {
      /* If we encounter an error log this to the console*/
      if (err) {
        console.dir(err);
        res.sendStatus(500);
      }
      if (result) {
        /* Document was successfully created so send a JSON encoded
          success message back with the Router Response object */
        res.json({ message: "successful game add update" });
      }
    }
  );
});

/////////////////////////////////////////
/* POST for closing week */
/////////////////////////////////////////
apiRouter.route("/schedule/weekClose").post((req, res) => {
  /* Use the gallery model and access Mongoose's API to
      retrieve ALL MongoDB documents whose displayed field
      has a value of true */
  console.log("closing week");
  console.log(req.body);
  schedule.updateOne(
    { week: req.body.selectedweek },
    { $set: { active: false } },
    (err, result) => {
      /* If we encounter an error log this to the console*/
      if (err) {
        console.dir(err);
        res.sendStatus(500);
      }
      if (result) {
        /* Document was successfully created so send a JSON encoded
          success message back with the Router Response object */
        res.json({ message: "week has been closed" });
      }
    }
  );
});

/////////////////////////////////////////
/* POST for activating next week */
/////////////////////////////////////////
apiRouter.route("/schedule/weekActive").post((req, res) => {
  /* Use the gallery model and access Mongoose's API to
      retrieve ALL MongoDB documents whose displayed field
      has a value of true */
  console.log("setting active week");
  console.log(req.body);
  schedule.updateOne(
    { week: req.body.selectedweek },
    { $set: { active: true } },
    (err, result) => {
      /* If we encounter an error log this to the console*/
      if (err) {
        console.dir(err);
        res.sendStatus(500);
      }
      if (result) {
        /* Document was successfully created so send a JSON encoded
          success message back with the Router Response object */
        res.json({ message: "active week set" });
      }
    }
  );
});

/////////////////////////////////////////
/* POST for adding bye team to week*/
/////////////////////////////////////////
apiRouter.route("/schedule/byeadd").post((req, res) => {
  /* Use the gallery model and access Mongoose's API to
      retrieve ALL MongoDB documents whose displayed field
      has a value of true */
  console.log("Adding bye team to week");
  schedule.update(
    { week: req.body.week.selectedweek },
    { $push: { byeteams: req.body.team.team } },
    (err, result) => {
      /* If we encounter an error log this to the console*/
      if (err) {
        console.dir(err);
        res.sendStatus(500);
      }
      if (result) {
        /* Document was successfully created so send a JSON encoded
          success message back with the Router Response object */
        res.json({ message: "successful game add update" });
      }
    }
  );
});

/////////////////////////////////////////
/* POST for adding week results*/
/////////////////////////////////////////
apiRouter.route("/schedule/resultsadd").post((req, res) => {
  /* Use the gallery model and access Mongoose's API to
      retrieve ALL MongoDB documents whose displayed field
      has a value of true */
  console.log("Adding results for week on server");
  schedule.updateOne(
    { week: req.body.week },
    { results: req.body.results },
    (err, result) => {
      /* If we encounter an error log this to the console*/
      if (err) {
        console.dir(err);
        res.sendStatus(500);
      }
      if (result) {
        /* Document was successfully created so send a JSON encoded
          success message back with the Router Response object */
        res.json({ message: "successfully added week results" });
      }
    }
  );
});

/////////////////////////////////////////
/* POST for setup of Season weeks */
/////////////////////////////////////////
apiRouter.route("/schedule/setupSeason").post((req, res) => {
  /* Use the gallery model and access Mongoose's API to
      retrieve ALL MongoDB documents whose displayed field
      has a value of true */
  console.log("3 - setting up season");
  // var setupSeason = new schedule(req.body);
  schedule.insertMany(req.body, (err, result) => {
    /* If we encounter an error log this to the console*/
    if (err) {
      console.dir(err);
      res.sendStatus(500);
    }
    if (result) {
      /* Document was successfully created so send a JSON encoded
          success message back with the Router Response object */
      res.json({ message: "successfully setup Season" });
    }
  });
});
/////////////////////////////////////////
/* POST to delete all Season */
/////////////////////////////////////////
apiRouter.route("/schedule/deleteSeason").post((req, res) => {
  /* Use the gallery model and access Mongoose's API to
      retrieve ALL MongoDB documents whose displayed field
      has a value of true */
  console.log("deleting all season");
  // var setupSeason = new schedule(req.body);
  schedule.deleteMany({}, (err, result) => {
    /* If we encounter an error log this to the console*/
    if (err) {
      console.dir(err);
      res.sendStatus(500);
    }
    if (result) {
      /* Document was successfully created so send a JSON encoded
          success message back with the Router Response object */
      res.json({ message: "successfully deleted Season" });
    }
  });
});

/////////////////////////////////////////
/* POST for add single season week from a json file */
/////////////////////////////////////////
apiRouter.route("/schedule/addweek").post((req, res) => {
  /* Use the gallery model and access Mongoose's API to
      retrieve ALL MongoDB documents whose displayed field
      has a value of true */
  console.log("adding a week");
  // var setupSeason = new schedule(req.body);
  schedule.updateOne(
    { week: req.body.week },
    { $set: { games: req.body.games, byeteams: req.body.byeteams } },
    (err, result) => {
      /* If we encounter an error log this to the console*/
      if (err) {
        console.dir(err);
        res.sendStatus(500);
      }
      if (result) {
        /* Document was successfully created so send a JSON encoded
          success message back with the Router Response object */
        res.json({ message: "successfully added week to Season" });
      }
    }
  );
});

/* Mount the specified Middleware function based on matching path */
app.use("/", apiRouter);

/* Listen for connections to the specified port */
app.listen(port, () => console.log(`Express server running on port ` + port));
