// src/pages/umkm/Chat.jsx
import { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  Send,
  Search,
  Paperclip,
  Image as ImageIcon,
  File,
  MoreVertical,
  Phone,
  Video,
  X,
  Check,
  CheckCheck,
  Clock,
  User,
  TrendingUp,
  Package,
  Truck,
  Bot,
  Sparkles
} from 'lucide-react';
import axios from 'axios';
const POLLING_INTERVAL = 2000; // 2 seconds
const GEMINI_API_KEY = 'AIzaSyC0fWjhAyAAONFAltYoiWdVekNRKe2A9K8'; // Replace with your actual Gemini API key
const AI_CHATBOT_ID = 'ai-assistant-001';


export default function UMKMChat() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all'); // all, investor, supplier, distributor, ai
  const messagesEndRef = useRef(null);
  const intervalRef = useRef(null);
  const [aiMessages, setAiMessages] = useState([]); // Store AI chatbot messages separately
  const [isAiTyping, setIsAiTyping] = useState(false);


  // ========================================
  // 🔵 BACKEND INTEGRATION POINT #1: STATE MANAGEMENT
  // ========================================
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  // ========================================
  // 🤖 AI CHATBOT: Initialize AI Assistant Contact
  // ========================================
  const AI_ASSISTANT_CONTACT = {
    id: AI_CHATBOT_ID,
    chat_id: AI_CHATBOT_ID,
    name: 'AI Assistant',
    role: 'ai',
    avatar: null,
    lastMessage: 'Halo! Saya siap membantu Anda 24/7 🤖',
    lastMessageTime: new Date().toISOString(),
    unreadCount: 0,
    isOnline: true,
    lastSeen: new Date().toISOString(),
  };

  // ========================================
  // 🤖 AI CHATBOT: Send Message to Gemini API
  // ========================================
  const sendMessageToGemini = async (userMessage) => {
    setIsAiTyping(true);
    
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: `You are a helpful AI assistant for UMKM (Usaha Mikro Kecil Menengah) business owners in Indonesia. 
                  Help them with business advice, financial planning, marketing strategies, and general business questions.
                  Always respond in Bahasa Indonesia in a friendly and professional manner.
                  
                  User question: ${userMessage}`
                }
              ]
            }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      const aiResponse = response.data.candidates[0].content.parts[0].text;
      
      // Create AI message object
      const aiMessage = {
        id: `ai-${Date.now()}`,
        senderId: AI_CHATBOT_ID,
        senderName: 'AI Assistant',
        message: aiResponse,
        messageType: 'text',
        fileUrl: null,
        fileName: null,
        sentAt: new Date().toISOString(),
        status: 'read',
        isOwn: false
      };

      setAiMessages(prev => [...prev, aiMessage]);
      setIsAiTyping(false);

      return aiMessage;

    } catch (error) {
      console.error('Error calling Gemini API:', error);
      setIsAiTyping(false);
      
      // Fallback error message
      const errorMessage = {
        id: `ai-error-${Date.now()}`,
        senderId: AI_CHATBOT_ID,
        senderName: 'AI Assistant',
        message: 'Maaf, saya mengalami kesulitan untuk merespon. Silakan coba lagi nanti.',
        messageType: 'text',
        fileUrl: null,
        fileName: null,
        sentAt: new Date().toISOString(),
        status: 'read',
        isOwn: false
      };

      setAiMessages(prev => [...prev, errorMessage]);
      return errorMessage;
    }
  };

  // ========================================
  // 🔵 BACKEND INTEGRATION POINT #2: FETCH CONTACTS/CONVERSATIONS
  // ========================================
  useEffect(() => {
    fetchIsMe();
  }, []);

  useEffect(()=>{
    if (currentUser.id){
      fetchData();
      fetchContacts();
    }
  }, [currentUser]);

  useEffect(() => {
    if (!selectedContact) return;

    // If AI chatbot is selected, load AI messages
    if (selectedContact.id === AI_CHATBOT_ID) {
      setMessages(aiMessages);
      return;
    }

    // Fetch immediately for regular contacts
    fetchMessagesData(selectedContact.id);

    // Clear previous interval if any
    if (intervalRef.current) clearInterval(intervalRef.current);

    // Start polling
    intervalRef.current = setInterval(() => {
      fetchMessagesData(selectedContact.id);
    }, POLLING_INTERVAL);

    // Cleanup when contact changes or component unmounts
    return () => clearInterval(intervalRef.current);
  }, [selectedContact, aiMessages]);

  const fetchData = async () => {
    try {
      const token = sessionStorage.getItem('token');

      const response = await axios.get('http://127.0.0.1:8000/api/chats', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Chat data:", response.data);

      const contacts = response.data.map((item) => {
        // Check if the current user is user_one
        const isUserOne = item.user_one.id === currentUser.id;
        console.log("Is User One:", isUserOne);
        // Select the other participant as receiver
        const receiver = isUserOne ? item.user_two : item.user_one;
        console.log("Receiver:", receiver);
        if (isUserOne)
        {
          console.log("User One is current user");
        }

        return {
          id: item.id,
          chat_id: item.chat_id,
          name: receiver?.name || "Unknown",
          role: receiver?.role || "",
          avatar: receiver?.avatar || null,
          lastMessage: item.last_message?.message || "Belum ada pesan",
          lastMessageTime: item.last_message?.created_at || item.updated_at,
          unreadCount: item.unread_count || 0,
          isOnline: receiver?.is_online || false,
          lastSeen: receiver?.last_seen || null,
        };
      });

      console.log("Contacts:", contacts);
      
      // Add AI Assistant as first contact
      setContacts([AI_ASSISTANT_CONTACT, ...contacts]);

    } catch (error) {
      console.error("Error fetching chat data:", error);
      // Even if error, still add AI Assistant
      setContacts([AI_ASSISTANT_CONTACT]);
    }
  };


  const fetchIsMe = async () => {
    axios.get(`http://127.0.0.1:8000/api/getMe`, {
      headers: {
        Authorization: `Bearer ` + sessionStorage.getItem('token'),
      },
    }).then((response) => {
      console.log("Current user data:", response.data);
      const isme = {
        id: response.data.id,
        name: response.data.name,
        role: response.data.role
      }
      setCurrentUser(isme);
    }).catch((error) => {
      console.error("Error fetching current user:", error);
    });
  }


  const fetchMessagesData = async (id) => {
    axios.get(`http://127.0.0.1:8000/api/chats/${id}/messages`, {
      headers: {
        Authorization: `Bearer ` + sessionStorage.getItem('token'),
      },
    }).then((response) => {
      console.log("Chat messages data:", response.data);
      const dummyMessages = response.data.map((item) => {
        const isOwn = item.sender_id === currentUser.id;

        return {
          id: item.id,
          senderId: item.sender_id,
          senderName: item.sender?.name || "Unknown",
          message: item.message,
          messageType: "text",
          fileUrl: null,
          fileName: null,
          sentAt: item.created_at || "2024-07-30T13:00:00Z",
          status: item.read_at ? "read" : "sent",
          isOwn: isOwn,
        };
      });
      setMessages(dummyMessages);
    }).catch((error) => {
      console.error("Error fetching chat messages data:", error);
    });
  }

  const fetchContacts = async () => {
    setIsLoading(true);

    try {
      // Simulate loading
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);

    } catch (error) {
      console.error('Error fetching contacts:', error);
      setIsLoading(false);
      alert('Gagal memuat daftar kontak');
    }
  };

  // ========================================
  // 🔵 BACKEND INTEGRATION POINT #4: SEND MESSAGE (Modified for AI)
  // ========================================
  const handleSendMessage = async () => {
    if (!messageInput.trim() || !selectedContact) return;

    const tempMessage = {
      id: `temp-${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      chat_id: selectedContact.id,
      message: messageInput,
      messageType: 'text',
      fileUrl: null,
      fileName: null,
      sentAt: new Date().toISOString(),
      status: 'sent',
      isOwn: true
    };

    // Optimistic update
    setMessages(prev => [...prev, tempMessage]);
    const currentMessage = messageInput;
    setMessageInput('');

    // ========================================
    // 🤖 AI CHATBOT: Handle AI Assistant messages
    // ========================================
    if (selectedContact.id === AI_CHATBOT_ID) {
      // Add user message to AI messages
      setAiMessages(prev => [...prev, tempMessage]);
      
      // Get AI response
      await sendMessageToGemini(currentMessage);
      return;
    }

    // ========================================
    // Regular backend message sending
    // ========================================
    const formData = new FormData();
    formData.append('message', currentMessage);

    try {
      axios.post(`http://127.0.0.1:8000/api/chats/${selectedContact.id}/messages`, formData, {
        headers: {
          Authorization: `Bearer ` + sessionStorage.getItem('token'),
        }
      }).then()

    } catch (error) {
      console.error('Error sending message:', error);
      // Rollback optimistic update jika gagal
      setMessages(prev => prev.filter(msg => msg.id !== tempMessage.id));
      alert('Gagal mengirim pesan');
    }
  };

  // ========================================
  // 🔵 BACKEND INTEGRATION POINT #5: SEND FILE/IMAGE
  // ========================================
  const handleSendFile = async (file) => {
    if (!selectedContact) return;

    // AI Assistant doesn't support file uploads
    if (selectedContact.id === AI_CHATBOT_ID) {
      alert('❌ AI Assistant saat ini belum support pengiriman file');
      return;
    }

    try {
      // TODO: BACKEND - Upload file dan send message
      alert(`📎 File "${file.name}" akan dikirim (dummy - belum terintegrasi backend)`);

    } catch (error) {
      console.error('Error sending file:', error);
      alert('Gagal mengirim file');
    }
  };

  // ========================================
  // 🔵 BACKEND INTEGRATION POINT #6: MARK MESSAGES AS READ
  // ========================================
  const markMessagesAsRead = async (contactId) => {
    try {
      // Update local state
      setContacts(prev =>
        prev.map(contact =>
          contact.id === contactId
            ? { ...contact, unreadCount: 0 }
            : contact
        )
      );

    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  };

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Filter contacts
  const filteredContacts = contacts.filter(contact => {
    if (selectedFilter !== 'all' && contact.role !== selectedFilter) return false;

    if (searchQuery) {
      return contact.name.toLowerCase().includes(searchQuery.toLowerCase());
    }

    return true;
  });

  // Helper functions
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 48) {
      return 'Kemarin';
    } else {
      return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
    }
  };

  const getRoleIcon = (role) => {
    const icons = {
      investor: <TrendingUp size={14} />,
      supplier: <Package size={14} />,
      distributor: <Truck size={14} />,
      ai: <Sparkles size={14} />
    };
    return icons[role];
  };

  const getRoleColor = (role) => {
    const colors = {
      investor: 'bg-green-100 text-green-700',
      supplier: 'bg-orange-100 text-orange-700',
      distributor: 'bg-purple-100 text-purple-700',
      ai: 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700'
    };
    return colors[role];
  };

  const getMessageStatusIcon = (status) => {
    const icons = {
      sent: <Check size={16} className="text-gray-400" />,
      delivered: <CheckCheck size={16} className="text-gray-400" />,
      read: <CheckCheck size={16} className="text-blue-500" />
    };
    return icons[status] || icons.sent;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat chat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-120px)] bg-white rounded-2xl shadow-sm border border-gray-100 flex overflow-hidden">
      {/* Contacts Sidebar */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Messages</h2>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kontak..."
              className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1">
            {[
              { id: 'all', label: 'Semua' },
              { id: 'ai', label: '🤖 AI' },
              { id: 'investor', label: 'Investor' },
              { id: 'supplier', label: 'Supplier' },
              { id: 'distributor', label: 'Distributor' }
            ].map(filter => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${selectedFilter === filter.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto">
          {filteredContacts.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="mx-auto text-gray-300 mb-2" size={48} />
              <p className="text-sm text-gray-600">Tidak ada kontak</p>
            </div>
          ) : (
            filteredContacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => {
                  setSelectedContact(contact);
                  if (contact.id !== AI_CHATBOT_ID) {
                    fetchMessagesData(contact.id);
                  }
                }}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition ${selectedContact?.id === contact.id ? 'bg-blue-50' : ''
                  }`}
              >
                <div className="flex items-start space-x-3">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    {contact.role === 'ai' ? (
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white">
                        <Bot size={24} />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {contact.name.charAt(0)}
                      </div>
                    )}
                    {contact.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>

                  {/* Contact Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 truncate text-sm">{contact.name}</h3>
                      <span className="text-xs text-gray-500">{formatTime(contact.lastMessageTime)}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600 truncate flex-1">{contact.lastMessage}</p>
                      {contact.unreadCount > 0 && (
                        <span className="ml-2 px-2 py-0.5 bg-blue-600 text-white rounded-full text-xs font-semibold">
                          {contact.unreadCount}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-1 mt-1">
                      <span className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-xs font-semibold ${getRoleColor(contact.role)}`}>
                        {getRoleIcon(contact.role)}
                        <span className="capitalize">{contact.role === 'ai' ? 'AI Assistant' : contact.role}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      {!selectedContact ? (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <MessageSquare className="mx-auto text-gray-300 mb-4" size={64} />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Pilih Kontak</h3>
            <p className="text-gray-600">Pilih kontak dari daftar untuk mulai chat</p>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                {selectedContact.role === 'ai' ? (
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white">
                    <Bot size={20} />
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {selectedContact.name.charAt(0)}
                  </div>
                )}
                {selectedContact.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  {selectedContact.name}
                  {selectedContact.role === 'ai' && (
                    <span className="text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 py-0.5 rounded-full">
                      Powered by Gemini
                    </span>
                  )}
                </h3>
                <p className="text-xs text-gray-500">
                  {selectedContact.role === 'ai' 
                    ? '🤖 AI Assistant - Selalu Online' 
                    : selectedContact.isOnline 
                      ? 'Online' 
                      : `Terakhir dilihat ${formatTime(selectedContact.lastSeen)}`
                  }
                </p>
              </div>
            </div>

            {selectedContact.role !== 'ai' && (
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                  <Phone size={20} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                  <Video size={20} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                  <MoreVertical size={20} className="text-gray-600" />
                </button>
              </div>
            )}
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] ${message.isOwn ? 'order-2' : 'order-1'}`}>
                  {message.messageType === 'text' && (
                    <div
                      className={`px-4 py-2 rounded-2xl ${message.isOwn
                        ? 'bg-blue-600 text-white'
                        : selectedContact.role === 'ai'
                          ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-gray-900 border-2 border-blue-200'
                          : 'bg-white text-gray-900 border border-gray-200'
                        }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                    </div>
                  )}

                  {message.messageType === 'file' && (
                    <div
                      className={`px-4 py-3 rounded-2xl ${message.isOwn
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-900 border border-gray-200'
                        }`}
                    >
                      <div className="flex items-center space-x-3">
                        <File size={24} />
                        <div>
                          <p className="text-sm font-semibold">{message.fileName}</p>
                          <p className="text-xs opacity-75">Klik untuk download</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className={`flex items-center space-x-2 mt-1 text-xs text-gray-500 ${message.isOwn ? 'justify-end' : 'justify-start'
                    }`}>
                    <span>{formatTime(message.sentAt)}</span>
                    {message.isOwn && getMessageStatusIcon(message.status)}
                  </div>
                </div>
              </div>
            ))}

            {/* AI Typing Indicator */}
            {isAiTyping && selectedContact.role === 'ai' && (
              <div className="flex justify-start">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 px-4 py-3 rounded-2xl">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center space-x-3">
              {/* Attachment Button - Hidden for AI */}
              {selectedContact.role !== 'ai' && (
                <>
                  <button
                    onClick={() => document.getElementById('fileInput').click()}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                    title="Kirim file"
                  >
                    <Paperclip size={20} />
                  </button>
                  <input
                    type="file"
                    id="fileInput"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files[0]) {
                        handleSendFile(e.target.files[0]);
                      }
                    }}
                  />

                  {/* Image Button */}
                  <button
                    onClick={() => document.getElementById('imageInput').click()}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                    title="Kirim gambar"
                  >
                    <ImageIcon size={20} />
                  </button>
                  <input
                    type="file"
                    id="imageInput"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files[0]) {
                        handleSendFile(e.target.files[0]);
                      }
                    }}
                  />
                </>
              )}

              {/* Message Input */}
              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder={selectedContact.role === 'ai' ? 'Tanya apa saja ke AI Assistant...' : 'Ketik pesan...'}
                disabled={isAiTyping}
                className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />

              {/* Send Button */}
              <button
                onClick={handleSendMessage}
                disabled={!messageInput.trim() || isAiTyping}
                className={`p-3 rounded-xl transition ${messageInput.trim() && !isAiTyping
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}