import { useOAuthAccessMutation } from '@/redux/api/authApi';

const useSendSessionData = () => {
  const [oAuthAccess] = useOAuthAccessMutation();

  const sendData = async (sessionData: any) => {
    try {
      const { data } = await oAuthAccess({ sessionData });
      // console.log('Send Session Data Response:', data);
      return data; // You can return data or handle it as needed
    } catch (error) {
      // console.error('Error sending session data:', error);
      throw error; // Rethrow the error or handle it as needed
    }
  };

  return { sendData };
};

export default useSendSessionData;
