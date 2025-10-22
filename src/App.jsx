import React, { useState, useEffect, useRef } from 'react';
import { Calendar, CheckSquare, Users, Bell, Plus, X, Menu, Trash2, Clock, MapPin, Mail, Phone, Star, Zap, TrendingUp } from 'lucide-react';

const ProductivityApp = () => {
  const [activeView, setActiveView] = useState('daily');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('tasks');
  const [showAddModal, setShowAddModal] = useState(false);
  
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Review project proposal', completed: false, priority: 'high', date: new Date().toISOString().split('T')[0], category: 'work' },
    { id: 2, title: 'Team standup meeting', completed: false, priority: 'medium', date: new Date().toISOString().split('T')[0], category: 'meetings' },
    { id: 3, title: 'Update documentation', completed: true, priority: 'low', date: new Date().toISOString().split('T')[0], category: 'work' },
  ]);
  
  const [events, setEvents] = useState([
    { id: 1, title: 'Product Launch', date: new Date().toISOString().split('T')[0], time: '14:00', description: 'Q4 product release event' },
    { id: 2, title: 'Quarterly Review', date: new Date().toISOString().split('T')[0], time: '16:00', description: 'Team performance review' },
  ]);
  
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Sarah Johnson', email: 'sarah.j@company.com', phone: '(555) 123-4567', role: 'Project Manager' },
    { id: 2, name: 'Michael Chen', email: 'michael.c@company.com', phone: '(555) 987-6543', role: 'Lead Developer' },
  ]);
  
  const [appointments, setAppointments] = useState([
    { id: 1, title: 'Client Meeting', date: new Date().toISOString().split('T')[0], time: '10:00', contactId: 1, location: 'Conference Room A' },
    { id: 2, title: 'Design Review', date: new Date().toISOString().split('T')[0], time: '15:30', contactId: 2, location: 'Virtual - Zoom' },
  ]);

  const canvasRef = useRef(null);
  const [artStyle, setArtStyle] = useState('warholPop'); // 'warholPop', 'daliSurreal', 'neonWaves', 'custom'
  const [customImage, setCustomImage] = useState(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = 320;
    canvas.height = 320;
    
    let animationId;
    let time = 0;
    
    const drawWarholPop = () => {
      const gridSize = 2;
      const cellSize = canvas.width / gridSize;
      const colors = [
        ['#00d9ff', '#ff00ff', '#00d9ff', '#ff00ff'],
        ['#ff00ff', '#00d9ff', '#ff00ff', '#00d9ff'],
        ['#00d9ff', '#ff00ff', '#00d9ff', '#ff00ff'],
        ['#ff00ff', '#00d9ff', '#ff00ff', '#00d9ff']
      ];
      
      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          const x = i * cellSize;
          const y = j * cellSize;
          
          // Background
          ctx.fillStyle = colors[i][j];
          ctx.fillRect(x, y, cellSize, cellSize);
          
          // Circle with offset based on time
          const offset = Math.sin(time + i + j) * 10;
          const centerX = x + cellSize / 2 + offset;
          const centerY = y + cellSize / 2 + offset;
          const radius = cellSize / 3 + Math.sin(time * 2 + i + j) * 10;
          
          // Outer glow
          const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 1.5);
          gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
          gradient.addColorStop(0.5, colors[(i + 1) % 2][(j + 1) % 2] + '80');
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius * 1.5, 0, Math.PI * 2);
          ctx.fill();
          
          // Main circle
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
          ctx.fill();
          
          // Inner circle
          ctx.fillStyle = colors[i][j];
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };
    
    const drawDaliSurreal = () => {
      // Gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0a0a1a');
      gradient.addColorStop(0.5, '#1a0a2e');
      gradient.addColorStop(1, '#0a0a1a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Melting clocks/shapes
      const shapes = [
        { x: 100, y: 80, color: '#00d9ff', rotation: time * 0.5 },
        { x: 220, y: 160, color: '#ff00ff', rotation: -time * 0.3 },
        { x: 160, y: 240, color: '#6b46ff', rotation: time * 0.4 }
      ];
      
      shapes.forEach((shape, i) => {
        ctx.save();
        ctx.translate(shape.x, shape.y);
        ctx.rotate(shape.rotation);
        
        // Dripping effect
        const melt = Math.sin(time * 2 + i) * 20;
        
        // Main shape with glow
        ctx.shadowBlur = 30;
        ctx.shadowColor = shape.color;
        
        ctx.fillStyle = shape.color;
        ctx.beginPath();
        ctx.ellipse(0, melt, 40, 30, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Drip
        ctx.beginPath();
        ctx.moveTo(0, 30 + melt);
        ctx.quadraticCurveTo(10, 50 + melt, 0, 70 + melt);
        ctx.quadraticCurveTo(-10, 50 + melt, 0, 30 + melt);
        ctx.fill();
        
        ctx.restore();
      });
      
      // Floating eyes/symbols
      for (let i = 0; i < 5; i++) {
        const x = 50 + i * 60;
        const y = 50 + Math.sin(time + i) * 30;
        
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#00d9ff';
        ctx.strokeStyle = '#00d9ff';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(x, y, 15, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.fillStyle = '#ff00ff';
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    
    const drawNeonWaves = () => {
      // Clear with dark background
      ctx.fillStyle = 'rgba(10, 10, 26, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Multiple wave layers
      const waves = [
        { color: '#00d9ff', amplitude: 40, frequency: 0.02, speed: 0.05, offset: 0 },
        { color: '#6b46ff', amplitude: 30, frequency: 0.03, speed: 0.03, offset: 50 },
        { color: '#ff00ff', amplitude: 35, frequency: 0.025, speed: 0.04, offset: 100 }
      ];
      
      waves.forEach(wave => {
        ctx.shadowBlur = 20;
        ctx.shadowColor = wave.color;
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 4;
        ctx.beginPath();
        
        for (let x = 0; x < canvas.width; x++) {
          const y = canvas.height / 2 + 
                    Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude +
                    Math.sin(x * wave.frequency * 2 + time * wave.speed * 1.5) * (wave.amplitude / 2) +
                    wave.offset;
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.stroke();
        
        // Fill below wave
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.fillStyle = wave.color + '20';
        ctx.fill();
      });
      
      // Particles
      for (let i = 0; i < 20; i++) {
        const x = (time * 50 + i * 50) % canvas.width;
        const y = canvas.height / 2 + Math.sin(time + i) * 80;
        
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00d9ff';
        ctx.fillStyle = '#00d9ff';
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    
    const drawCustomImage = () => {
      if (!customImage) {
        drawWarholPop();
        return;
      }
      
      const img = new Image();
      img.src = customImage;
      img.onload = () => {
        // Apply filters
        ctx.filter = 'contrast(1.5) saturate(1.8) brightness(1.2)';
        
        // Draw image to fit canvas
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width - img.width * scale) / 2;
        const y = (canvas.height - img.height * scale) / 2;
        
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        
        // Add color overlay for effect
        ctx.filter = 'none';
        ctx.globalCompositeOperation = 'overlay';
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#00d9ff40');
        gradient.addColorStop(0.5, '#6b46ff40');
        gradient.addColorStop(1, '#ff00ff40');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.globalCompositeOperation = 'source-over';
        
        // Glowing border
        ctx.strokeStyle = '#00d9ff';
        ctx.lineWidth = 4;
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#00d9ff';
        ctx.strokeRect(2, 2, canvas.width - 4, canvas.height - 4);
      };
    };
    
    const animate = () => {
      time += 0.02;
      
      switch(artStyle) {
        case 'warholPop':
          drawWarholPop();
          break;
        case 'daliSurreal':
          drawDaliSurreal();
          break;
        case 'neonWaves':
          drawNeonWaves();
          break;
        case 'custom':
          drawCustomImage();
          break;
        default:
          drawWarholPop();
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [artStyle, customImage]);
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomImage(event.target.result);
        setArtStyle('custom');
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteItem = (type, id) => {
    switch(type) {
      case 'tasks':
        setTasks(tasks.filter(t => t.id !== id));
        break;
      case 'events':
        setEvents(events.filter(e => e.id !== id));
        break;
      case 'contacts':
        setContacts(contacts.filter(c => c.id !== id));
        break;
      case 'appointments':
        setAppointments(appointments.filter(a => a.id !== id));
        break;
    }
  };

  const addItem = (type, item) => {
    const newItem = { ...item, id: Date.now() };
    switch(type) {
      case 'tasks':
        setTasks([...tasks, newItem]);
        break;
      case 'events':
        setEvents([...events, newItem]);
        break;
      case 'contacts':
        setContacts([...contacts, newItem]);
        break;
      case 'appointments':
        setAppointments([...appointments, newItem]);
        break;
    }
    setShowAddModal(false);
  };

  const filterByView = (items) => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    return items.filter(item => {
      const itemDate = new Date(item.date);
      const diffDays = Math.floor((itemDate - today) / (1000 * 60 * 60 * 24));
      
      switch(activeView) {
        case 'daily':
          return item.date === todayStr;
        case 'weekly':
          return diffDays >= 0 && diffDays < 7;
        case 'monthly':
          return itemDate.getMonth() === today.getMonth() && 
                 itemDate.getFullYear() === today.getFullYear();
        default:
          return true;
      }
    });
  };

  const AddModal = () => {
    const [formData, setFormData] = useState({});

    const handleSubmit = () => {
      addItem(activeSection, formData);
      setFormData({});
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 backdrop-blur-md animate-fadeIn">
        <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 border-2 border-cyan-400 rounded-3xl p-8 w-full max-w-md shadow-2xl shadow-cyan-500/50 transform transition-all animate-slideUp" style={{
          boxShadow: '0 0 60px rgba(0, 217, 255, 0.4), inset 0 0 30px rgba(107, 70, 255, 0.1)'
        }}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 animate-pulse">
              Add New {activeSection.slice(0, -1)}
            </h3>
            <button onClick={() => setShowAddModal(false)} className="text-cyan-400 hover:text-purple-400 transition-all hover:rotate-90 transform duration-300">
              <X size={24} />
            </button>
          </div>
          
          <div className="space-y-4">
            {activeSection === 'tasks' && (
              <>
                <input
                  type="text"
                  placeholder="Task title"
                  className="w-full bg-slate-900/80 border-2 border-cyan-500/50 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:outline-none shadow-lg shadow-cyan-500/20 transition-all hover:shadow-cyan-500/40"
                  onChange={(e) => setFormData({...formData, title: e.target.value, completed: false})}
                  required
                />
                <select
                  className="w-full bg-slate-900/80 border-2 border-cyan-500/50 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:outline-none shadow-lg shadow-cyan-500/20 transition-all"
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
                <input
                  type="date"
                  className="w-full bg-slate-900/80 border-2 border-cyan-500/50 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:outline-none shadow-lg shadow-cyan-500/20 transition-all"
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  required
                />
              </>
            )}
            
            {activeSection === 'events' && (
              <>
                <input
                  type="text"
                  placeholder="Event title"
                  className="w-full bg-slate-900/80 border-2 border-cyan-500/50 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:outline-none shadow-lg shadow-cyan-500/20 transition-all"
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
                <input
                  type="date"
                  className="w-full bg-slate-900/80 border-2 border-cyan-500/50 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:outline-none shadow-lg shadow-cyan-500/20 transition-all"
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  required
                />
                <input
                  type="time"
                  className="w-full bg-slate-900/80 border-2 border-cyan-500/50 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:outline-none shadow-lg shadow-cyan-500/20 transition-all"
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  required
                />
                <textarea
                  placeholder="Description"
                  className="w-full bg-slate-900/80 border-2 border-cyan-500/50 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:outline-none shadow-lg shadow-cyan-500/20 transition-all"
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows="3"
                />
              </>
            )}
            
            {activeSection === 'contacts' && (
              <>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full bg-slate-900/80 border-2 border-cyan-500/50 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:outline-none shadow-lg shadow-cyan-500/20 transition-all"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-slate-900/80 border-2 border-cyan-500/50 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:outline-none shadow-lg shadow-cyan-500/20 transition-all"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  className="w-full bg-slate-900/80 border-2 border-cyan-500/50 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:outline-none shadow-lg shadow-cyan-500/20 transition-all"
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Role/Title"
                  className="w-full bg-slate-900/80 border-2 border-cyan-500/50 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:outline-none shadow-lg shadow-cyan-500/20 transition-all"
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                />
              </>
            )}
            
            {activeSection === 'appointments' && (
              <>
                <input
                  type="text"
                  placeholder="Appointment title"
                  className="w-full bg-slate-900/80 border-2 border-cyan-500/50 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:outline-none shadow-lg shadow-cyan-500/20 transition-all"
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
                <input
                  type="date"
                  className="w-full bg-slate-900/80 border-2 border-cyan-500/50 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:outline-none shadow-lg shadow-cyan-500/20 transition-all"
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  required
                />
                <input
                  type="time"
                  className="w-full bg-slate-900/80 border-2 border-cyan-500/50 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:outline-none shadow-lg shadow-cyan-500/20 transition-all"
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  required
                />
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full bg-slate-900/80 border-2 border-cyan-500/50 rounded-xl px-4 py-3 text-white focus:border-cyan-400 focus:outline-none shadow-lg shadow-cyan-500/20 transition-all"
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
              </>
            )}
            
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-4 rounded-xl font-black hover:from-cyan-400 hover:to-purple-500 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-500/70 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <Zap size={20} />
                <span>ADD {activeSection.slice(0, -1).toUpperCase()}</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const getPriorityStyle = (priority) => {
    switch(priority) {
      case 'high':
        return {
          gradient: 'from-purple-500 to-pink-500',
          shadow: 'shadow-purple-500/50',
          glow: 'hover:shadow-purple-500/70'
        };
      case 'medium':
        return {
          gradient: 'from-cyan-500 to-blue-500',
          shadow: 'shadow-cyan-500/50',
          glow: 'hover:shadow-cyan-500/70'
        };
      case 'low':
        return {
          gradient: 'from-blue-500 to-purple-500',
          shadow: 'shadow-blue-500/50',
          glow: 'hover:shadow-blue-500/70'
        };
      default:
        return {
          gradient: 'from-gray-500 to-gray-600',
          shadow: 'shadow-gray-500/50',
          glow: 'hover:shadow-gray-500/70'
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{top: '10%', left: '10%'}}></div>
        <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float-delayed" style={{bottom: '10%', right: '10%'}}></div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-30px) translateX(30px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(30px) translateX(-30px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(0, 217, 255, 0.5); }
          50% { box-shadow: 0 0 40px rgba(0, 217, 255, 0.8); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-slideUp { animation: slideUp 0.4s ease-out; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
      `}</style>
      
      <header className="bg-gradient-to-r from-slate-950/90 via-cyan-950/30 to-slate-950/90 backdrop-blur-xl border-b-2 border-cyan-500/50 sticky top-0 z-40 shadow-2xl shadow-cyan-500/20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5"></div>
        <div className="container mx-auto px-6 py-5 flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-cyan-400 hover:text-purple-400 transition-all transform hover:scale-125 hover:rotate-180 duration-500"
            >
              <Menu size={28} />
            </button>
            <div className="flex items-center space-x-3">
              <TrendingUp className="text-cyan-400 animate-pulse" size={32} />
              <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 drop-shadow-lg animate-pulse">
                PRODUCTIVITY HUB
              </h1>
            </div>
          </div>
          
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3 rounded-full font-black hover:from-cyan-400 hover:to-purple-500 transition-all transform hover:scale-110 flex items-center space-x-2 shadow-xl shadow-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/70 relative overflow-hidden group"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
            <span>ADD NEW</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </header>

      <div className="flex relative">
        <aside
          className={`fixed left-0 top-[73px] h-[calc(100vh-73px)] bg-gradient-to-b from-slate-950/98 via-blue-950/98 to-slate-950/98 backdrop-blur-xl border-r-2 border-cyan-500/50 transition-all duration-500 ease-in-out z-30 shadow-2xl shadow-cyan-500/20 ${
            sidebarOpen ? 'translate-x-0 w-80' : '-translate-x-full w-80'
          }`}
          style={{
            boxShadow: '20px 0 60px rgba(0, 217, 255, 0.2)'
          }}
        >
          <nav className="p-6 space-y-3">
            {[
              { id: 'tasks', icon: CheckSquare, label: 'Tasks', color: 'cyan' },
              { id: 'events', icon: Calendar, label: 'Events', color: 'purple' },
              { id: 'appointments', icon: Bell, label: 'Appointments', color: 'cyan' },
              { id: 'contacts', icon: Users, label: 'Contacts', color: 'purple' }
            ].map(({ id, icon: Icon, label, color }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={`w-full flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all transform hover:scale-105 shadow-lg relative overflow-hidden group ${
                  activeSection === id
                    ? `bg-gradient-to-r from-${color}-500 to-purple-600 text-white shadow-${color}-500/60`
                    : 'bg-slate-900/50 text-gray-300 hover:bg-slate-800 hover:text-white shadow-slate-900/50'
                }`}
                style={activeSection === id ? {
                  boxShadow: `0 0 30px rgba(0, 217, 255, 0.6)`
                } : {}}
              >
                <Icon size={22} className={activeSection === id ? 'animate-pulse' : ''} />
                <span className="font-black text-lg">{label}</span>
                {activeSection === id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                )}
              </button>
            ))}
          </nav>
          
          <div className="p-6 mt-6">
            <div className="bg-gradient-to-br from-slate-900/80 to-blue-900/80 rounded-3xl p-6 border-2 border-cyan-500/50 shadow-2xl relative overflow-hidden animate-pulse-glow">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10"></div>
              <div className="flex justify-center relative z-10">
                <canvas 
                  ref={canvasRef}
                  className="rounded-2xl shadow-2xl"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </div>
              
              {/* Style Selector */}
              <div className="mt-4 flex flex-wrap gap-2 justify-center relative z-10">
                <button
                  onClick={() => setArtStyle('warholPop')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    artStyle === 'warholPop' 
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white' 
                      : 'bg-slate-800 text-gray-400 hover:text-white'
                  }`}
                >
                  Pop Art
                </button>
                <button
                  onClick={() => setArtStyle('daliSurreal')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    artStyle === 'daliSurreal' 
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white' 
                      : 'bg-slate-800 text-gray-400 hover:text-white'
                  }`}
                >
                  Surreal
                </button>
                <button
                  onClick={() => setArtStyle('neonWaves')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    artStyle === 'neonWaves' 
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white' 
                      : 'bg-slate-800 text-gray-400 hover:text-white'
                  }`}
                >
                  Neon
                </button>
                <label className="px-3 py-1 rounded-lg text-xs font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-white cursor-pointer hover:from-purple-500 hover:to-pink-500 transition-all">
                  Custom
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              
              <p className="text-center text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mt-3 relative z-10">
                YOUR SUCCESS CORE
              </p>
            </div>
          </div>
        </aside>

        <main className={`flex-1 transition-all duration-500 relative z-10 ${sidebarOpen ? 'ml-80' : 'ml-0'}`}>
          <div className="container mx-auto px-8 py-10">
            <div className="flex justify-center mb-10">
              <div className="bg-slate-900/50 backdrop-blur-sm rounded-full p-2 flex space-x-2 shadow-xl border-2 border-cyan-500/50 animate-pulse-glow">
                {['daily', 'weekly', 'monthly'].map((view) => (
                  <button
                    key={view}
                    onClick={() => setActiveView(view)}
                    className={`px-8 py-3 rounded-full font-black transition-all transform hover:scale-110 relative overflow-hidden group ${
                      activeView === view
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-xl shadow-cyan-500/60'
                        : 'text-gray-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <span className="relative z-10">{view.toUpperCase()}</span>
                    {activeView === view && (
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="max-w-6xl mx-auto">
              {activeSection === 'tasks' && (
                <div className="space-y-5 animate-slideUp">
                  <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-6 flex items-center space-x-3">
                    <Zap className="text-cyan-400" size={36} />
                    <span>TASKS</span>
                  </h2>
                  {filterByView(tasks).map((task, index) => {
                    const style = getPriorityStyle(task.priority);
                    return (
                      <div
                        key={task.id}
                        className={`bg-gradient-to-br from-slate-900/80 to-blue-900/60 backdrop-blur-sm border-2 border-cyan-500/50 rounded-2xl p-6 hover:border-cyan-400 transition-all transform hover:scale-105 hover:shadow-2xl ${style.shadow} ${style.glow} animate-slideUp`}
                        style={{
                          animationDelay: `${index * 0.1}s`,
                          boxShadow: '0 0 30px rgba(0, 217, 255, 0.3)'
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-5 flex-1">
                            <input
                              type="checkbox"
                              checked={task.completed}
                              onChange={() => toggleTask(task.id)}
                              className="w-6 h-6 rounded-lg border-2 border-cyan-500 text-purple-500 focus:ring-2 focus:ring-cyan-500 cursor-pointer transition-all transform hover:scale-125"
                            />
                            <div className="flex-1">
                              <h3 className={`text-xl font-black ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>
                                {task.title}
                              </h3>
                              <div className="flex items-center space-x-4 mt-2">
                                <span className={`text-sm px-4 py-1.5 rounded-full font-black bg-gradient-to-r ${style.gradient} shadow-lg ${style.shadow}`}>
                                  {task.priority.toUpperCase()}
                                </span>
                                <span className="text-sm text-cyan-400 flex items-center space-x-1">
                                  <Calendar size={14} />
                                  <span>{task.date}</span>
                                </span>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => deleteItem('tasks', task.id)}
                            className="text-gray-400 hover:text-red-400 transition-all transform hover:scale-125 hover:rotate-12"
                          >
                            <Trash2 size={22} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {activeSection === 'events' && (
                <div className="space-y-5 animate-slideUp">
                  <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-6 flex items-center space-x-3">
                    <Star className="text-purple-400 animate-pulse" size={36} fill="currentColor" />
                    <span>EVENTS</span>
                  </h2>
                  {filterByView(events).map((event, index) => (
                    <div
                      key={event.id}
                      className="bg-gradient-to-br from-purple-900/60 to-cyan-900/60 backdrop-blur-sm border-2 border-purple-500/50 rounded-2xl p-6 hover:border-purple-400 transition-all hover:shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transform hover:scale-105 animate-slideUp"
                      style={{
                        animationDelay: `${index * 0.1}s`,
                        boxShadow: '0 0 30px rgba(107, 70, 255, 0.4)'
                      }}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <Star className="text-purple-400 animate-pulse" size={24} fill="currentColor" />
                            <h3 className="text-2xl font-black text-white">{event.title}</h3>
                          </div>
                          <p className="text-gray-300 mb-3 text-lg">{event.description}</p>
                          <div className="flex items-center space-x-6 text-sm">
                            <span className="flex items-center space-x-2 bg-slate-900/50 px-3 py-1.5 rounded-lg border border-cyan-500/30 text-cyan-400">
                              <Calendar size={16} />
                              <span>{event.date}</span>
                            </span>
                            <span className="flex items-center space-x-2 bg-slate-900/50 px-3 py-1.5 rounded-lg border border-purple-500/30 text-purple-400">
                              <Clock size={16} />
                              <span>{event.time}</span>
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => deleteItem('events', event.id)}
                          className="text-gray-400 hover:text-red-400 transition-all transform hover:scale-125 hover:rotate-12"
                        >
                          <Trash2 size={22} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeSection === 'appointments' && (
                <div className="space-y-5 animate-slideUp">
                  <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-6 flex items-center space-x-3">
                    <Bell className="text-cyan-400 animate-pulse" size={36} />
                    <span>APPOINTMENTS</span>
                  </h2>
                  {filterByView(appointments).map((apt, index) => (
                    <div
                      key={apt.id}
                      className="bg-gradient-to-br from-slate-900/80 to-cyan-900/60 backdrop-blur-sm border-2 border-cyan-500/50 rounded-2xl p-6 hover:border-cyan-400 transition-all hover:shadow-2xl shadow-cyan-500/50 hover:shadow-cyan-500/70 transform hover:scale-105 animate-slideUp"
                      style={{
                        animationDelay: `${index * 0.1}s`,
                        boxShadow: '0 0 30px rgba(0, 217, 255, 0.3)'
                      }}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-2xl font-black text-white mb-4">{apt.title}</h3>
                          <div className="space-y-2">
                            <p className="flex items-center space-x-3 text-gray-300 bg-slate-900/50 px-4 py-2 rounded-lg w-fit border border-purple-500/30">
                              <MapPin size={18} className="text-purple-400" />
                              <span>{apt.location}</span>
                            </p>
                            <div className="flex items-center space-x-4">
                              <span className="flex items-center space-x-2 bg-slate-900/50 px-4 py-2 rounded-lg text-cyan-400 border border-cyan-500/30">
                                <Calendar size={16} />
                                <span>{apt.date}</span>
                              </span>
                              <span className="flex items-center space-x-2 bg-slate-900/50 px-4 py-2 rounded-lg text-purple-400 border border-purple-500/30">
                                <Clock size={16} />
                                <span>{apt.time}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => deleteItem('appointments', apt.id)}
                          className="text-gray-400 hover:text-red-400 transition-all transform hover:scale-125 hover:rotate-12"
                        >
                          <Trash2 size={22} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeSection === 'contacts' && (
                <div className="space-y-5 animate-slideUp">
                  <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-6 flex items-center space-x-3">
                    <Users className="text-purple-400 animate-pulse" size={36} />
                    <span>CONTACTS</span>
                  </h2>
                  <div className="grid md:grid-cols-2 gap-5">
                    {contacts.map((contact, index) => (
                      <div
                        key={contact.id}
                        className="bg-gradient-to-br from-slate-900/80 to-purple-900/60 backdrop-blur-sm border-2 border-purple-500/50 rounded-2xl p-6 hover:border-purple-400 transition-all hover:shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transform hover:scale-105 animate-slideUp"
                        style={{
                          animationDelay: `${index * 0.1}s`,
                          boxShadow: '0 0 30px rgba(107, 70, 255, 0.3)'
                        }}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <h3 className="text-2xl font-black text-white">{contact.name}</h3>
                            <p className="text-cyan-400 font-bold mt-1">{contact.role}</p>
                          </div>
                          <button
                            onClick={() => deleteItem('contacts', contact.id)}
                            className="text-gray-400 hover:text-red-400 transition-all transform hover:scale-125 hover:rotate-12"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                        <div className="space-y-2">
                          <p className="flex items-center space-x-3 text-gray-300 bg-slate-900/50 px-3 py-2 rounded-lg border border-cyan-500/30">
                            <Mail size={16} className="text-cyan-400" />
                            <span className="text-sm">{contact.email}</span>
                          </p>
                          <p className="flex items-center space-x-3 text-gray-300 bg-slate-900/50 px-3 py-2 rounded-lg border border-purple-500/30">
                            <Phone size={16} className="text-purple-400" />
                            <span className="text-sm">{contact.phone}</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {showAddModal && <AddModal />}
    </div>
  );
};

export default ProductivityApp;