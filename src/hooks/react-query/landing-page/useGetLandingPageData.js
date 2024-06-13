import MainApi from '../../../api/MainApi'
import { useQuery } from 'react-query'

export const landingPagedata = async () => {
    const { data } = await MainApi.get('/api/v1/react-landing-page')
    return data
}
// export const landingPagedata = async () => {
//     try {
//         const response = await fetch('http://localhost:8000/api/v1/react-landing-page');
//         console.log(response)
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         // const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         throw error; // Rethrow để bên gọi hàm có thể xử lý lỗi
//     }
// };

export const useGetLandingPageData = (onSuccessHandler) => {
    return useQuery('landing_page_data', () => landingPagedata(), {
        onSuccess: onSuccessHandler,
        enabled:false
    })
}
