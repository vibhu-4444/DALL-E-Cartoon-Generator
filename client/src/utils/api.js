const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

async function parseResponse(response) {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = data.message || 'Request failed. Please try again.';
    throw new Error(message);
  }

  return data;
}

export async function fetchShowcaseData() {
  const response = await fetch(`${API_BASE_URL}/showcase`);
  return parseResponse(response);
}

export async function postInquiry(payload) {
  const response = await fetch(`${API_BASE_URL}/inquiries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  return parseResponse(response);
}

