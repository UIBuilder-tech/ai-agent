export interface Message {
  role: 'user' | 'assistant';
  content: { text: { value: string } }[];
  created_at: string;
}

export interface ChatResponse {
  message: string;
  error?: string;
}