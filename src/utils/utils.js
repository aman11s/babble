import dayjs from "dayjs";

export const isAlreadyFollowing = (loggedUser, currUser) => {
  const followingUsernames = loggedUser.following.map(
    ({ username }) => username
  );
  return followingUsernames.some((usernames) => usernames === currUser);
};

export const getTime = (timeStamp) => {
  const months = {
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "Apr",
    "05": "May",
    "06": "Jun",
    "07": "Jul",
    "08": "Aug",
    "09": "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };

  const hours = {
    "01": "01",
    "02": "02",
    "03": "03",
    "04": "04",
    "05": "05",
    "06": "06",
    "07": "07",
    "08": "08",
    "09": "09",
    10: "10",
    11: "11",
    12: "12",
    13: "01",
    14: "02",
    15: "03",
    16: "04",
    17: "05",
    18: "06",
    19: "07",
    20: "08",
    21: "09",
    22: "10",
    23: "11",
    "00": "12",
  };

  const date = timeStamp.slice(8, 10);
  const monthNum = timeStamp.slice(5, 7);
  const month = months[monthNum];
  const year = timeStamp.slice(0, 4);
  const hourNum = timeStamp.slice(11, 13);
  const hour = hours[hourNum];
  const min = timeStamp.slice(14, 16);
  const time = `${hour}:${min} ${
    Number(hourNum) > 11 ? "PM" : "AM"
  } · ${month} ${date}, ${year}`;

  return time;
};

export const getSortedPosts = (allPosts, sortState) => {
  switch (sortState) {
    case "Latest":
      return [...allPosts].sort(
        (a, b) => dayjs(b?.createdAt) - dayjs(a?.createdAt)
      );

    case "Oldest":
      return [...allPosts].sort(
        (a, b) => dayjs(a?.createdAt) - dayjs(b?.createdAt)
      );

    case "Trending":
      return [...allPosts].sort(
        (a, b) => b?.likes.likeCount - a?.likes.likeCount
      );

    default:
      return allPosts;
  }
};

export const isAlreadyInBookmark = (allBookmarks, bookmarkPostId) =>
  allBookmarks.some(({ _id }) => _id === bookmarkPostId);

export const isAlreadyLikedPost = (allLikes, loggedUser) =>
  allLikes.some(({ username }) => username === loggedUser.username);

export const getUsersByQuery = (users, query) => {
  if (query === "") {
    return [];
  }
  return users.filter(({ firstName, lastName, username }) => {
    return [firstName, lastName, username]
      .join("")
      .toLowerCase()
      .includes(query.toLowerCase());
  });
};
