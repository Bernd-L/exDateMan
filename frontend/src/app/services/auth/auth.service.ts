import { Injectable } from "@angular/core";
import { User } from "../../models/user/user";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {}

  /**
   * The latest (cached) response from getCurrentUser
   */
  static cachedUserStatus: GetStatusResponse;

  /**
   * The base URL for all API calls
   */
  baseUrl: string = environment.baseUrl;

  /**
   * Logs in the user
   *
   * @param email The email address of the user to be logged in
   * @param pwd The password of the user to be logged in
   */
  async login(
    email: string,
    pwd: string,
    tfaToken?: string
  ): Promise<LoginResponse> {
    const user: LoginResponse | any = await this.http
      .post<JSON>(
        this.baseUrl + "/authentication/login",
        {
          email,
          pwd,
          tfaToken
        },
        { withCredentials: true }
      )
      .toPromise();
    return user;
  }

  /**
   * Perform a logout request
   *
   * This will remove the JWT thus signing out the user.
   */
  async logout(): Promise<any> {
    const res = await this.http
      .post(this.baseUrl + "/authentication/logout", null)
      .toPromise();

    // Clear the LocalStorage
    window.localStorage.clear();

    /* window.localStorage.setItem(
      "user",
      JSON.stringify({
        offline: false,
        user: null,
        authorized: false
      } as GetStatusResponse)
    ); */

    return res;
  }

  /**
   * Issues a request to the server to create a new account
   * @param email The desired email
   * @param pwd The desired password
   * @param name The desired friendly name
   */
  async register(
    email: string,
    pwd: string,
    name: string
  ): Promise<RegisterResponse> {
    const req: RegisterRequest = { email, pwd, name } as RegisterRequest;
    return await this.http
      .post<RegisterResponse>(this.baseUrl + "/authentication/register", req)
      .toPromise();
  }

  /**
   * (Performs refresh) Fetches info from the server about the current login status
   */
  async getCurrentUser(): Promise<GetStatusResponse> {
    let response: GetStatusResponse;

    try {
      // Try to get the data from the API
      response = await this.http
        .get<GetStatusResponse>(this.baseUrl + "/authentication/status")
        .toPromise();

      // The API doesn't set this flag
      response.offline = false;

      // Persist the data offline
      window.localStorage.setItem("user", JSON.stringify(response));

      // Set the offline flag to false
    } catch (error) {
      switch (error.status) {
        // Check, if the error was caused by the user being offline
        case 504:
          // Serve the data from LocalStorage
          response = JSON.parse(window.localStorage.getItem("user"));
          response.offline = true;
          break;
        // Check if the error was caused by the user not being logged in
        case 401:
          response = error.error;
          response.offline = false;
          response.user = null;
          break;
        default:
          // The user is online, but couldn't be authenticated
          response.authorized = false;

          // The API doesn't set this flag
          response.offline = false;
          break;
      }
    }

    // Cache the response
    AuthService.cachedUserStatus = response;

    // Return the response object
    return response;
  }

  /**
   * Persists changes to the user account by sending an event to the API
   *
   * @param user The edited user object
   */
  async saveUser(
    user: RegisterRequest
  ): Promise<{ status: string; user: User }> {
    return await this.http
      .put<{ status: string; user: User }>(this.baseUrl + "/account", user)
      .toPromise();
  }

  /**
   * Fetches a user by email their address from the API
   *
   * @param email The email address to be resolved to a user
   */
  async resolveUser(email: string): Promise<User> {
    return await this.http
      .get<User>(this.baseUrl + "/authentication/resolve/" + email)
      .toPromise();
  }

  /**
   * Fetches a user by UUID from the API
   *
   * @param uuid The uuid of the user to be fetched
   */
  async getUserByUuid(uuid: string): Promise<User> {
    return await this.http
      .get<User>(this.baseUrl + "/authentication/user/" + uuid)
      .toPromise();
  }
}

/**
 * This is the response form the server for the login route
 */
export interface LoginResponse {
  // TODO redo
  status: number;
  user: string; // The username
}

interface RegisterRequest {
  email: string;
  pwd: string;
  name: string;
}

interface RegisterResponse {
  status: number;
  message: string;
  email: string;
}

export interface GetStatusResponse {
  authorized: boolean;
  offline: boolean;
  user: {
    uuid: string;
    email: string;
    name: string;
  };
}
