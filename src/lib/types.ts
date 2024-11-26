export interface CustomizationOptions {
  buttonIcon: string;
  borderColor: string;
  borderRadius: string;
  headerBgColor: string;
  botBubbleColor: string;
  botTextColor: string;
  userBubbleColor: string;
  userTextColor: string;
  fontFamily: string;
}

export interface ChatMessage {
  isBot: boolean;
  text: string;
}
