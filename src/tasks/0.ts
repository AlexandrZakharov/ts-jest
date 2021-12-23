import axios, { AxiosInstance } from 'axios';

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

type CreatePost = Omit<IPost, 'id'>;

abstract class ApiService {
  private static instance: AxiosInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  });

  protected get = <ReturnType = unknown>(url: string): Promise<ReturnType> => {
    return ApiService.instance
      .get(url)
      .then((res) => res.data)
      .catch(this.catchResponse);
  };

  protected post = <BodyType, ReturnType = unknown>(
    url: string,
    body: BodyType,
  ): Promise<ReturnType> => {
    return ApiService.instance
      .post(url, body)
      .then((res) => res.data)
      .catch(this.catchResponse);
  };

  protected put = <BodyType, ReturnType = unknown>(
    url: string,
    body: BodyType,
  ): Promise<ReturnType> => {
    return ApiService.instance
      .put(url, body)
      .then((res) => res.data)
      .catch(this.catchResponse);
  };

  protected delete = <ReturnType = unknown>(
    url: string,
  ): Promise<ReturnType> => {
    return ApiService.instance
      .delete(url)
      .then((res) => res.data)
      .catch(this.catchResponse);
  };

  protected catchResponse = (error: Error) => {
    console.error(error);
    return Promise.reject(error);
  };
}

class PostsApiService extends ApiService {
  private _baseUrl = '/posts';

  getPostList = (): Promise<IPost[]> => {
    return this.get<IPost[]>(this._baseUrl);
  };

  getPost = (id: number): Promise<IPost> => {
    return this.get<IPost>(`${this._baseUrl}/${id}`);
  };

  createPost = (body: IPost): Promise<IPost> => {
    return this.post<CreatePost, IPost>(this._baseUrl, body);
  };

  updatePost = (body: IPost): Promise<IPost> => {
    return this.put<IPost, IPost>(this._baseUrl, body);
  };

  deletePost = (id: number): Promise<IPost> => {
    return this.delete<IPost>(`${this._baseUrl}/${id}`);
  };
}
