const db = require('../database/database.js');

let commentController = {};

// query fetching all comments for specific trails
commentController.getComment = async (req, res, next) => {
    console.log("getComment")
    // console.log("req.q",req.query);
    const query = {
        text: 'SELECT * FROM comments WHERE trailid = $1',   // where comment id = trail id
        values: [req.query.trailid]
    };
    try {
        const result = await db.query(query);
        // console.log("result", result.fields)
        res.locals.comments = result.rows;
        // console.log("r.r",result.rows);
        return next();
    } catch (err) {
        return next({
            log: `Error in getComment database query: ${err}`,
        });
    }
};

//query posting new comment to DB and then fetching all comments including the one just posted
commentController.postComment = async (req, res, next) => {
    console.log("postComment")
    const { comment, trailid, username } = req.body;
    const query = { 
        text: 'INSERT INTO comments ( comment, trailid, username) VALUES ($1, $2, $3) RETURNING *',
        values: [comment, trailid, username],
    }
    try {
        const { rows } = await db.query(query);
        res.locals.comments = rows[0]
        // console.log("res.locals", res.locals.comments)
        return next()
    } catch (err) {
        return next({
            log: `Error in postComment db query: ${err}`,
        });
    }
};


module.exports = commentController