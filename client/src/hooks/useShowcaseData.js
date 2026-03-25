import { useEffect, useState } from 'react';
import { postInquiry, fetchShowcaseData } from '../utils/api';
import { fallbackData } from '../utils/defaultData';

const initialStatus = {
  state: 'idle',
  message: '',
};

export function useShowcaseData() {
  const [data, setData] = useState(fallbackData);
  const [isLoading, setIsLoading] = useState(true);
  const [apiOnline, setApiOnline] = useState(false);
  const [inquiryStatus, setInquiryStatus] = useState(initialStatus);

  useEffect(() => {
    let isMounted = true;

    const loadShowcase = async () => {
      try {
        const response = await fetchShowcaseData();

        if (isMounted) {
          setData(response.data || fallbackData);
          setApiOnline(true);
        }
      } catch (error) {
        if (isMounted) {
          setData(fallbackData);
          setApiOnline(false);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadShowcase();

    return () => {
      isMounted = false;
    };
  }, []);

  const submitInquiry = async (payload) => {
    setInquiryStatus({
      state: 'loading',
      message: 'Sending your request to the Lumina workspace...',
    });

    try {
      const response = await postInquiry(payload);

      setInquiryStatus({
        state: 'success',
        message: response.message || 'Request submitted successfully.',
      });

      return true;
    } catch (error) {
      setInquiryStatus({
        state: 'error',
        message: error.message || 'Unable to submit your request right now.',
      });

      return false;
    }
  };

  return {
    data,
    isLoading,
    apiOnline,
    inquiryStatus,
    submitInquiry,
  };
}
