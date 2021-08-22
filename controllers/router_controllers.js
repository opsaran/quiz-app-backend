const { Creator, User } = require("../model");

// const { wrap: async } = require("co");
const getcreators = (req, res) => {
  return res.send("okayyy borrr");
};

const postquiz = (req, res) => {
  const { userquiz } = req.body;
  // console.log(req.body);
  console.log("This is the second loh");
  console.log(userquiz.questions[0].options);
  // const man = new Creator({ creator: creator, topic: topic });
  // man
  //   .save()
  //   .then((data) => res.status(200).json({ success: true, data: data }))
  //   .catch((err) => res.status(400).json({ success: false, msg: err }));

  Creator.create({
    ...userquiz,
    // creator: userquiz.creator,
    // topic: userquiz.topic,
    // questions: userquiz.questions.map((ques) => {
    //   return {
    //     question: ques.question,
    //     q_id: ques.q_id,
    //     correctanswerid: ques.correctanswerid,
    //     options: ques.options.map((opt) => {
    //       return { ...opt };
    //     }),
    //   };
    // }),
  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(400).json({ success: false, msg: error });
    });
};

const gettopics = (req, res) => {
  const promise = Creator.aggregate([
    { $group: { _id: { topic: "$topic" }, topiccount: { $sum: 1 } } },
  ])
    .project({ _id: 0, topic: "$_id.topic", topiccount: 1 })
    .exec();
  promise
    .then((data) => {
      return res.status(200).json({ success: true, data: data });
    })
    .catch((err) => {
      return res.status(500).json({ success: false, msg: err });
    });
};

const getrandomquiz = (req, res) => {
  const chosentopic = req.params.topic;

  Creator.aggregate([
    { $match: { topic: chosentopic } },
    { $sample: { size: 1 } },
  ])
    .then((data) => {
      return res.status(200).json({ success: true, data: data });
    })
    .catch((err) => {
      return res.status(500).json({ success: false, msg: err });
    });
};

const postnewuser = (req, res) => {
  const { userdata } = req.body;

  const newuser = new User({ ...userdata });
  newuser
    .save()
    .then((data) => {
      return res.status(200).json({ success: true, data: data });
    })
    .catch((err) => {
      return res.status(400).json({ success: false, msg: err });
    });
};

const getusers = (req, res) => {
  User.aggregate([{ $sample: { size: 5 } }])
    .then((data) => {
      return res.status(200).json({ success: true, data: data });
    })
    .catch((err) => {
      return res.status(500).json({ success: false, msg: err });
    });
};

module.exports = {
  getcreators,
  postquiz,
  gettopics,
  getrandomquiz,
  postnewuser,
  getusers,
};
