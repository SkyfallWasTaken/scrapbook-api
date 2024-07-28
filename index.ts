const S3_BUCKET_NAME = "scrapbook-into-the-redwoods";
const URL_ROOT = "https://scrapbook.hackclub.com";
const WEB_ROOT = `${URL_ROOT}/web`;
const API_ROOT = `${URL_ROOT}/api`;

type UserProfile = {
  id: string;
  slackID: string;
  email: string | null;
  emailVerified: string | null;
  username: string;
  streakCount: number;
  maxStreaks: number;
  displayStreak: boolean;
  streaksToggledOff: boolean | null;
  customDomain: string | null;
  cssURL: string | null;
  website: string | null;
  github: string | null;
  image: string | null;
  fullSlackMember: boolean | null;
  avatar: string;
  webring: [];
  newMember: false;
  timezoneOffset: number;

  /** The user's timezone, for example `Europe/London` */
  timezone: string;

  /** Any pronouns set by the user. */
  pronouns: string | null;
  customAudioURL: string | null;
  lastUsernameUpdatedTime: string | null;
  webhookURL: string | null;
};

type UserPageData = {
  profile: UserProfile;
};

export class ScrapbookApi {
  sessionToken: string | null;

  constructor(sessionToken: string | null) {
    this.sessionToken = sessionToken;
  }

  /** Returns every post made on Scrapbook **in the past day.** */
  async getGlobalPosts() {
    const response = await fetch(`${API_ROOT}/posts`);
    if (!response.ok) {
      throw new Error("Failed to fetch global posts");
    }
    return response.json();
  }

  /**
   * Returns the user and their posts. Unauthenticated endpoint.
   *
   * ## Example
   * ```typescript
   * const api = new ScrapbookApi();
   * const user = await api.getUserPageData("SkyfallWasTaken");
   * console.log(`${user.profile.username}'s most recent post text is: ${user.posts[0].text}`);
   * ```
   * */
  async getUserPageData(username: string): Promise<UserPageData> {
    const response = await fetch(`${API_ROOT}/users/${username}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch user \`${username}\``);
    }
    return response.json();
  }

  /**
   * Returns all users on Scrapbook **with at least one Scrapbook post.** Unauthenticated endpoint.
   *
   * ## Example
   * ```typescript
   * const api = new ScrapbookApi();
   * const users = await api.getAllUsers();
   * console.log(`Scrapbook has ${users.length} users!`);
   * ```
   * */
  async getAllUserProfiles(): Promise<UserProfile[]> {
    const response = await fetch(`${API_ROOT}/users`);
    if (!response.ok) {
      throw new Error("Failed to fetch all users");
    }
    return response.json();
  }
}
