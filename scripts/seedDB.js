const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/googlebooks"
);

const bookSeed = [
  {
    title: "Harry Potter and the Goblet of Fire - Slytherin Edition",
    authors: [ "J. K. Rowling" ],
    description:
    "Let the magic of J.K. Rowling's classic Harry Potter series take you back to Hogwarts School of Witchcraft and Wizardry. This Slytherin House Edition ofHarry Potter and the Goblet of Fire celebrates the noble character of the Hogwarts house famed for its pride, ambition and cunning. Harry's fourth year at Hogwarts is packed with more great Slytherin moments and characters, culminating in the terrifying finale of the Triwizard Tournament, which sees the momentous return of Voldemort, the greatest Dark Wizard of all time ... Each Slytherin House Edition features vibrant sprayed edges and intricate silver foiling. The Goblet of Fire blazes at the very centre of the front cover, framed by stunning iconography that draws on themes and moments from J.K. Rowling's much-loved story. In addition to a bespoke introduction and exclusive insights into the magical paintings of Hogwarts, the book also boasts new illustrations by Kate Greenaway winner Levi Pinfold, including a spectacular portrait of Lord Voldemort himself. All seven books in the series will be issued in these highly collectable, beautifully crafted House Editions, designed to be treasured and read for years to come. A must-have for anyone who has ever imagined sitting under the Sorting Hat in the Great Hall at Hogwarts waiting to hear the words, 'Better be SLYTHERIN!'",
    image: "http://books.google.com/books/content?id=ELUTyQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
    link:"http://books.google.com/books?id=ELUTyQEACAAJ&dq=goblet+of+fire&hl=&source=gbs_api",
    date: new Date(Date.now())
  },
  {
    title: "Holes",
    authors: [ "Louis Sachar" ],
    description:
    "Winner of the Newbery Medal and the National Book Award! This #1 New York Times bestselling, modern classic in which boys are forced to dig holes day in and day out is now available with a splashy new look. Stanley Yelnats is under a curse. A curse that began with his no-good-dirty-rotten-pig-stealing-great-great-grandfather and has since followed generations of Yelnatses. Now Stanley has been unjustly sent to a boys’ detention center, Camp Green Lake, where the boys build character by spending all day, every day digging holes exactly five feet wide and five feet deep. There is no lake at Camp Green Lake. But there are an awful lot of holes. It doesn’t take long for Stanley to realize there’s more than character improvement going on at Camp Green Lake. The boys are digging holes because the warden is looking for something. But what could be buried under a dried-up lake? Stanley tries to dig up the truth in this inventive and darkly humorous tale of crime and punishment—and redemption. Includes a double bonus: an excerpt from Small Steps, the follow-up to Holes, as well as an excerpt from Louis Sachar’s new middle-grade novel, Fuzzy Mud. \"A smart jigsaw puzzle of a novel.\" --The New York Times WINNER OF THE BOSTON GLOBE-HORN BOOK AWARD A NEW YORK TIMES BOOK REVIEW NOTABLE CHILDREN'S BOOK SELECTED FOR NUMEROUS BEST BOOK OF THE YEAR AND ALA HONORS",
    image: "http://books.google.com/books/content?id=U_zINMa9cAAC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    link:"https://play.google.com/store/books/details?id=U_zINMa9cAAC&source=gbs_api",
    date: new Date(Date.now())
  }
];

db.Book
  .remove({})
  .then(() => db.Book.collection.insertMany(bookSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
