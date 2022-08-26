export const isAlreadyFollowing = (loggedUser, currUser) => {
  const followingUsernames = loggedUser.following.map(
    ({ username }) => username
  );
  return followingUsernames.some((usernames) => usernames === currUser);
};
