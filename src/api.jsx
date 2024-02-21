import axios from 'axios';


const apiInstance = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
})


// Add a request interceptor
apiInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
apiInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
  
      // If the error status is 401 and there is no originalRequest._retry flag,
      // it means the token has expired and we need to refresh it
      if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        try {
          // const refreshToken = localStorage.getItem('refreshToken');
          // const response = await axios.post("http://localhost:5000/api/auth/refresh1", { refreshToken });

           const response = await axios.get("http://localhost:5000/api/auth/refresh1", { withCredentials: true});
          const { accessToken } = response.data;
  
          localStorage.setItem('accessToken', accessToken);
  
          // Retry the original request with the new token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axios(originalRequest);
        } catch (error) {
          console.log(error)
        }
      }
  
      return Promise.reject(error);
    }
  );
  
export default apiInstance;
