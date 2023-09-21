import { getPosts } from "././functions.js";
import { POSTS_URL } from "././variables.js";
const feedSection= document.getElementById("feed")
getPosts(POSTS_URL, feedSection);