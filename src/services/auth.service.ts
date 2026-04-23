import { account, ID } from "@/src/lib/appwrite";

/**
 * Creates a new user account and automatically logs them in.
 */
export const signupUser = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    // 1. Create the account
    await account.create(
      ID.unique(),
      email,
      password,
      name
    );

    // 2. Create a session (log the user in)
    return await loginUser(email, password);
  } catch (error) {
    console.error("AuthService: signupUser error", error);
    throw error;
  }
};

/**
 * Creates an email/password session for the user.
 */
export const loginUser = async (
  email: string,
  password: string
) => {
  try {
    return await account.createEmailPasswordSession(
      email,
      password
    );
  } catch (error) {
    console.error("AuthService: loginUser error", error);
    throw error;
  }
};

/**
 * Retrieves the current active user session.
 */
export const getCurrentUser = async () => {
  try {
    return await account.get();
  } catch (error) {
    // It's normal to not have a session on first load
    return null;
  }
};

/**
 * Deletes the current session (logs the user out).
 */
export const logoutUser = async () => {
  try {
    return await account.deleteSession("current");
  } catch (error) {
    console.error("AuthService: logoutUser error", error);
    throw error;
  }
};
