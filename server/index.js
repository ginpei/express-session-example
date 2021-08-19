const express = require("express");
const { createSession, loadSession, saveSession } = require("./fake");

// static values
const port = 3000;

// set up express with middleware
const app = express();
app.set("view engine", "ejs");

// ----------------------------------------------------------------
// routings and controllers

app.get("/", (req, res) => {
  // pick ID from request
  const sessionId = pickSessionId(req);

  // retrieve session or create
  const prevSession = loadSession(sessionId) ?? createSession();

  // deal with session
  const updatedSession = {
    ...prevSession,
    count: prevSession.count + 1,
  };

  // remember session on server
  saveSession(updatedSession);

  // let client save ID if not yet
  if (!sessionId) {
    putSessionId(res, prevSession.id);
  }

  // response
  res.render("index.ejs", { count: updatedSession.count });
});

// ----------------------------------------------------------------

// get started!
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log("Port", port);
});

// ----------------------------------------------------------------
// misc

/**
 * You should use cookie-parser and `req.cookies.sid` instead.
 * @param {import("express").Request} req
 */
function pickSessionId(req) {
  const sessionId = req.headers.cookie
    ?.split("; ")
    .find((v) => v.startsWith("sid="))
    ?.slice("sid=".length);
  if (!(typeof sessionId === "string")) {
    return "";
  }

  return sessionId;
}

/**
 * You should use cookie-parser and `res.cookie("sid", sessionId)` instead.
 * @param {import("express").Response} res
 * @param {string} sessionId
 */
function putSessionId(res, sessionId) {
  res.setHeader("Set-Cookie", `sid=${sessionId}`);
}
