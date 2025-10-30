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
  Truck
} from 'lucide-react';

export default function UMKMChat() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all'); // all, investor, supplier, distributor
  const messagesEndRef = useRef(null);

  // ========================================
  // 🔵 BACKEND INTEGRATION POINT #1: STATE MANAGEMENT
  // ========================================
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState({
    id: 'umkm-123',
    name: 'Warung Kopi Nusantara',
    role: 'umkm'
  });

  // ========================================
  // 🔵 BACKEND INTEGRATION POINT #2: FETCH CONTACTS/CONVERSATIONS
  // ========================================
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setIsLoading(true);
    
    try {
      // TODO: BACKEND - Ganti dengan actual API call
      // const response = await fetch('/api/umkm/chat/contacts', {
      //   method: 'GET',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
      //     'Content-Type': 'application/json'
      //   }
      // });
      // const data = await response.json();

      // EXPECTED RESPONSE FORMAT dari backend:
      // {
      //   success: true,
      //   data: {
      //     contacts: [
      //       {
      //         id: "user-123",
      //         name: "John Doe",
      //         role: "investor", // investor, supplier, distributor
      //         avatar: "https://api.umkmverse.com/avatars/xxx.jpg",
      //         lastMessage: "Terima kasih infonya!",
      //         lastMessageTime: "2024-07-30T14:30:00Z",
      //         unreadCount: 3,
      //         isOnline: true,
      //         lastSeen: "2024-07-30T14:30:00Z"
      //       }
      //     ]
      //   }
      // }

      // DUMMY DATA - Hapus setelah integrasi backend
      setTimeout(() => {
        const dummyContacts = [
          {
            id: 'inv-001',
            name: 'John Doe',
            role: 'investor',
            avatar: null,
            lastMessage: 'Terima kasih untuk laporan keuangan bulan ini. Sangat detail!',
            lastMessageTime: '2024-07-30T14:30:00Z',
            unreadCount: 3,
            isOnline: true,
            lastSeen: '2024-07-30T14:30:00Z'
          },
          {
            id: 'sup-001',
            name: 'CV Supplier Bahan Baku',
            role: 'supplier',
            avatar: null,
            lastMessage: 'Stok biji kopi Arabica sudah ready 500kg',
            lastMessageTime: '2024-07-30T12:15:00Z',
            unreadCount: 0,
            isOnline: false,
            lastSeen: '2024-07-30T12:20:00Z'
          },
          {
            id: 'dis-001',
            name: 'PT Distribusi Express',
            role: 'distributor',
            avatar: null,
            lastMessage: 'Pengiriman ke Surabaya besok pagi jam 8',
            lastMessageTime: '2024-07-30T10:45:00Z',
            unreadCount: 1,
            isOnline: true,
            lastSeen: '2024-07-30T14:35:00Z'
          },
          {
            id: 'inv-002',
            name: 'Jane Smith',
            role: 'investor',
            avatar: null,
            lastMessage: 'Bagaimana progress ekspansi ke Bandung?',
            lastMessageTime: '2024-07-29T16:20:00Z',
            unreadCount: 0,
            isOnline: false,
            lastSeen: '2024-07-29T18:00:00Z'
          },
          {
            id: 'sup-002',
            name: 'Toko Kemasan Jaya',
            role: 'supplier',
            avatar: null,
            lastMessage: 'Ok siap, saya kirim sample desain kemasannya',
            lastMessageTime: '2024-07-28T14:00:00Z',
            unreadCount: 0,
            isOnline: false,
            lastSeen: '2024-07-28T15:30:00Z'
          }
        ];

        setContacts(dummyContacts);
        setIsLoading(false);
      }, 1000);

      // ACTUAL IMPLEMENTATION - Uncomment setelah backend ready
      // if (data.success) {
      //   setContacts(data.data.contacts);
      // }
      // setIsLoading(false);

    } catch (error) {
      console.error('Error fetching contacts:', error);
      setIsLoading(false);
      alert('Gagal memuat daftar kontak');
    }
  };

  // ========================================
  // 🔵 BACKEND INTEGRATION POINT #3: FETCH MESSAGES WITH SPECIFIC CONTACT
  // ========================================
  const fetchMessages = async (contactId) => {
    try {
      // TODO: BACKEND - Ganti dengan actual API call
      // const response = await fetch(`/api/umkm/chat/messages/${contactId}`, {
      //   method: 'GET',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
      //     'Content-Type': 'application/json'
      //   }
      // });
      // const data = await response.json();

      // EXPECTED RESPONSE FORMAT dari backend:
      // {
      //   success: true,
      //   data: {
      //     messages: [
      //       {
      //         id: "msg-001",
      //         senderId: "inv-001",
      //         senderName: "John Doe",
      //         receiverId: "umkm-123",
      //         message: "Halo, saya tertarik dengan laporan ROI terbaru",
      //         messageType: "text", // text, image, file
      //         fileUrl: null,
      //         fileName: null,
      //         sentAt: "2024-07-30T14:00:00Z",
      //         status: "read", // sent, delivered, read
      //         isOwn: false // true jika pesan dari current user
      //       }
      //     ]
      //   }
      // }

      // DUMMY DATA - Hapus setelah integrasi backend
      const dummyMessages = [
        {
          id: 'msg-001',
          senderId: contactId,
          senderName: contacts.find(c => c.id === contactId)?.name,
          receiverId: currentUser.id,
          message: 'Halo! Saya tertarik dengan laporan keuangan terbaru. Bisa dikirimkan?',
          messageType: 'text',
          fileUrl: null,
          fileName: null,
          sentAt: '2024-07-30T13:00:00Z',
          status: 'read',
          isOwn: false
        },
        {
          id: 'msg-002',
          senderId: currentUser.id,
          senderName: currentUser.name,
          receiverId: contactId,
          message: 'Tentu! Saya akan kirimkan segera.',
          messageType: 'text',
          fileUrl: null,
          fileName: null,
          sentAt: '2024-07-30T13:05:00Z',
          status: 'read',
          isOwn: true
        },
        {
          id: 'msg-003',
          senderId: currentUser.id,
          senderName: currentUser.name,
          receiverId: contactId,
          message: 'Ini laporan keuangan bulan Juli 2024',
          messageType: 'file',
          fileUrl: '#',
          fileName: 'Laporan_Keuangan_Juli_2024.pdf',
          sentAt: '2024-07-30T13:10:00Z',
          status: 'read',
          isOwn: true
        },
        {
          id: 'msg-004',
          senderId: contactId,
          senderName: contacts.find(c => c.id === contactId)?.name,
          receiverId: currentUser.id,
          message: 'Terima kasih! Saya akan review terlebih dahulu.',
          messageType: 'text',
          fileUrl: null,
          fileName: null,
          sentAt: '2024-07-30T13:15:00Z',
          status: 'read',
          isOwn: false
        },
        {
          id: 'msg-005',
          senderId: contactId,
          senderName: contacts.find(c => c.id === contactId)?.name,
          receiverId: currentUser.id,
          message: 'Terima kasih untuk laporan keuangan bulan ini. Sangat detail!',
          messageType: 'text',
          fileUrl: null,
          fileName: null,
          sentAt: '2024-07-30T14:30:00Z',
          status: 'read',
          isOwn: false
        }
      ];

      setMessages(dummyMessages);

      // ACTUAL IMPLEMENTATION - Uncomment setelah backend ready
      // if (data.success) {
      //   setMessages(data.data.messages);
      // }

      // Mark messages as read
      await markMessagesAsRead(contactId);

    } catch (error) {
      console.error('Error fetching messages:', error);
      alert('Gagal memuat pesan');
    }
  };

  // ========================================
  // 🔵 BACKEND INTEGRATION POINT #4: SEND MESSAGE
  // ========================================
  const handleSendMessage = async () => {
    if (!messageInput.trim() || !selectedContact) return;

    const tempMessage = {
      id: `temp-${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      receiverId: selectedContact.id,
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
    setMessageInput('');

    try {
      // TODO: BACKEND - Ganti dengan actual API call
      // const response = await fetch('/api/umkm/chat/send', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     receiverId: selectedContact.id,
      //     message: messageInput,
      //     messageType: 'text',
      //     sentAt: new Date().toISOString()
      //   })
      // });
      // const data = await response.json();

      // EXPECTED REQUEST BODY:
      // {
      //   receiverId: "inv-001",
      //   message: "Halo, ini pesannya",
      //   messageType: "text", // text, image, file
      //   fileUrl: null, // jika messageType = file/image
      //   fileName: null, // jika messageType = file
      //   sentAt: "2024-07-30T15:00:00Z"
      // }

      // EXPECTED RESPONSE:
      // {
      //   success: true,
      //   message: "Pesan berhasil dikirim",
      //   data: {
      //     id: "msg-123",
      //     ... message data ...
      //     status: "sent"
      //   }
      // }

      // ACTUAL IMPLEMENTATION - Uncomment setelah backend ready
      // if (data.success) {
      //   // Update tempMessage dengan data dari server
      //   setMessages(prev => 
      //     prev.map(msg => msg.id === tempMessage.id ? data.data : msg)
      //   );
      // }

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

    try {
      // TODO: BACKEND - Upload file dan send message
      // const formData = new FormData();
      // formData.append('file', file);
      // formData.append('receiverId', selectedContact.id);
      // formData.append('messageType', file.type.startsWith('image/') ? 'image' : 'file');
      // formData.append('sentAt', new Date().toISOString());

      // const response = await fetch('/api/umkm/chat/send-file', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   },
      //   body: formData
      // });
      // const data = await response.json();

      // EXPECTED REQUEST BODY (FormData):
      // - file: File object
      // - receiverId: "inv-001"
      // - messageType: "file" atau "image"
      // - sentAt: "2024-07-30T15:00:00Z"

      // EXPECTED RESPONSE:
      // {
      //   success: true,
      //   message: "File berhasil dikirim",
      //   data: {
      //     id: "msg-124",
      //     fileUrl: "https://api.umkmverse.com/uploads/chat/xxx.pdf",
      //     fileName: "document.pdf",
      //     ... message data ...
      //   }
      // }

      // DUMMY - Hapus setelah integrasi
      alert(`📎 File "${file.name}" akan dikirim (dummy - belum terintegrasi backend)`);

      // ACTUAL IMPLEMENTATION - Uncomment setelah backend ready
      // if (data.success) {
      //   setMessages(prev => [...prev, data.data]);
      // }

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
      // TODO: BACKEND - Mark all unread messages as read
      // await fetch(`/api/umkm/chat/mark-read/${contactId}`, {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
      //     'Content-Type': 'application/json'
      //   }
      // });

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

  // ========================================
  // 🔵 BACKEND INTEGRATION POINT #7: REAL-TIME UPDATES
  // ========================================
  // TODO: BACKEND - Implementasi WebSocket atau Laravel Reverb untuk real-time
  // useEffect(() => {
  //   // Connect to WebSocket
  //   const ws = new WebSocket('wss://api.umkmverse.com/ws');
  //   
  //   ws.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     
  //     if (data.type === 'new_message') {
  //       // Update messages jika chat sedang dibuka
  //       if (selectedContact?.id === data.message.senderId) {
  //         setMessages(prev => [...prev, data.message]);
  //         markMessagesAsRead(data.message.senderId);
  //       }
  //       
  //       // Update contacts list
  //       setContacts(prev => 
  //         prev.map(contact => 
  //           contact.id === data.message.senderId
  //             ? {
  //                 ...contact,
  //                 lastMessage: data.message.message,
  //                 lastMessageTime: data.message.sentAt,
  //                 unreadCount: selectedContact?.id === contact.id 
  //                   ? contact.unreadCount 
  //                   : contact.unreadCount + 1
  //               }
  //             : contact
  //         )
  //       );
  //     }
  //     
  //     if (data.type === 'message_status_update') {
  //       setMessages(prev =>
  //         prev.map(msg =>
  //           msg.id === data.messageId
  //             ? { ...msg, status: data.status }
  //             : msg
  //         )
  //       );
  //     }
  //   };
  //   
  //   return () => ws.close();
  // }, [selectedContact]);

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
      distributor: <Truck size={14} />
    };
    return icons[role];
  };

  const getRoleColor = (role) => {
    const colors = {
      investor: 'bg-green-100 text-green-700',
      supplier: 'bg-orange-100 text-orange-700',
      distributor: 'bg-purple-100 text-purple-700'
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
              { id: 'investor', label: 'Investor' },
              { id: 'supplier', label: 'Supplier' },
              { id: 'distributor', label: 'Distributor' }
            ].map(filter => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  selectedFilter === filter.id
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
                  fetchMessages(contact.id);
                }}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition ${
                  selectedContact?.id === contact.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {contact.name.charAt(0)}
                    </div>
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
                        <span className="capitalize">{contact.role}</span>
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
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {selectedContact.name.charAt(0)}
                </div>
                {selectedContact.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{selectedContact.name}</h3>
                <p className="text-xs text-gray-500">
                  {selectedContact.isOnline ? 'Online' : `Terakhir dilihat ${formatTime(selectedContact.lastSeen)}`}
                </p>
              </div>
            </div>

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
                      className={`px-4 py-2 rounded-2xl ${
                        message.isOwn
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-900 border border-gray-200'
                      }`}
                    >
                      <p className="text-sm">{message.message}</p>
                    </div>
                  )}

                  {message.messageType === 'file' && (
                    <div
                      className={`px-4 py-3 rounded-2xl ${
                        message.isOwn
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

                  <div className={`flex items-center space-x-2 mt-1 text-xs text-gray-500 ${
                    message.isOwn ? 'justify-end' : 'justify-start'
                  }`}>
                    <span>{formatTime(message.sentAt)}</span>
                    {message.isOwn && getMessageStatusIcon(message.status)}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center space-x-3">
              {/* Attachment Button */}
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
                placeholder="Ketik pesan..."
                className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Send Button */}
              <button
                onClick={handleSendMessage}
                disabled={!messageInput.trim()}
                className={`p-3 rounded-xl transition ${
                  messageInput.trim()
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