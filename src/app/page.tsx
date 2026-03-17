'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import {
  Search,
  Bell,
  User,
  Heart,
  MessageCircle,
  Home,
  FolderOpen,
  Camera,
  MessageSquare,
  ShoppingCart,
  BarChart3,
  Settings,
  LogOut,
  Plus,
  FileText,
  TrendingUp,
  TrendingDown,
  Edit,
  Trash2,
  Eye,
  ChevronRight,
  ChevronDown,
  HelpCircle,
  Download,
  Clock,
  AlertCircle,
  Menu,
  X,
  Shirt,
  Baby,
  LayoutDashboard,
  Globe,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  CreditCard,
  Smartphone,
  Moon,
  Sun,
  MapPin,
  Mail,
  Calendar,
  Star,
  Filter,
  Grid,
  List,
  Minus,
  Check,
  Sparkles,
  ArrowRight,
  Users,
  Package,
  HeartHandshake,
  Bookmark,
  Share2,
  Send,
  Image,
  MoreHorizontal,
  ThumbsUp,
  Flag,
  Reply,
  DollarSign,
  Wallet,
  PieChart,
  Activity,
  Target,
  Award,
  Gift,
  Zap,
  TrendingUp as TrendIcon,
  CalendarDays,
  BookOpen,
  Video,
  Play,
  Users as UsersIcon,
  Crown,
  Megaphone,
  BarChart2,
  FileSpreadsheet,
  RefreshCw,
  ExternalLink,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  Clock as ClockIcon,
  ShoppingBag,
  CreditCard as CardIcon,
  Truck,
  Package as PackageIcon,
  DollarSign as DollarIcon,
  Percent,
  Tag,
  Filter as FilterIcon,
  SortAsc,
  LayoutGrid,
  LayoutList,
  BellRing,
  CheckCheck,
  Settings2,
  UserPlus,
  UserMinus,
  MailOpen,
  Archive,
  StarOff,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Ban,
  UserCheck,
  UserX,
  Lock,
  Unlock,
  Database,
  Server,
  Layers,
  Briefcase,
  ArrowLeft,
  Upload,
  Save,
  Image as ImageIcon
} from 'lucide-react'

// ============================================
// THEME CONTEXT
// ============================================

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {}
})

const useTheme = () => useContext(ThemeContext)

// ============================================
// TYPES
// ============================================

type ViewType = 'landing' | 'explorer' | 'creators' | 'boutique' | 'product' | 'cart' | 'checkout' | 'creator-profile' | 'dashboard' | 'profile' | 'messages' | 'comments' | 'analytics' | 'shop-manage' | 'planner' | 'subscribers' | 'superadmin' | 'admin-users' | 'admin-content' | 'admin-analytics' | 'admin-revenue' | 'admin-settings' | 'new-project'

// User role type
type UserRole = 'user' | 'creator' | 'admin' | 'superadmin'

interface PlatformUser {
  id: number
  name: string
  email: string
  avatar: string
  role: UserRole
  status: 'active' | 'suspended' | 'pending'
  joinedAt: string
  lastActive: string
  projects: number
  followers: number
  revenue: number
  location: string
  verified: boolean
}

interface ReportedContent {
  id: number
  type: 'project' | 'comment' | 'user' | 'message'
  reportedBy: string
  reportedUser: string
  content: string
  reason: string
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed'
  reportedAt: string
  severity: 'low' | 'medium' | 'high'
}

interface PlatformStats {
  totalUsers: number
  activeUsers: number
  totalCreators: number
  totalProjects: number
  totalRevenue: number
  monthlyGrowth: number
  newUsersToday: number
  pendingReports: number
}

interface RevenueData {
  month: string
  revenue: number
  subscriptions: number
  commissions: number
  withdrawals: number
}

interface Project {
  id: number
  title: string
  image: string
  likes: number
  comments: number
  views: number
  creator: { name: string; avatar: string }
  tag: string
  price?: number
  description?: string
  liked?: boolean
}

interface Creator {
  id: number
  name: string
  avatar: string
  specialty: string
  followers: string
  bio?: string
  location?: string
  projects?: number
}

interface Product {
  id: number
  title: string
  image: string
  price: number
  category: string
  creator: string
  creatorId?: number
  creatorAvatar?: string
  rating: number
  reviews: number
  description?: string
  stock?: number
  createdAt?: string
  details?: string[]
  materials?: string[]
  difficulty?: 'Débutant' | 'Intermédiaire' | 'Avancé' | 'Expert'
  timeToComplete?: string
  images?: string[]
  language?: string
  pages?: number
  featured?: boolean
}

interface SearchResult {
  id: number
  type: 'project' | 'user' | 'product' | 'message'
  title: string
  subtitle: string
  image?: string
}

interface CartItem extends Product {
  quantity: number
}

interface Message {
  id: number
  sender: { name: string; avatar: string }
  content: string
  time: string
  isOwn: boolean
  image?: string
}

interface Conversation {
  id: number
  user: { name: string; avatar: string }
  lastMessage: string
  time: string
  unread: number
  online: boolean
}

interface Comment {
  id: number
  user: { name: string; avatar: string }
  content: string
  time: string
  project: string
  likes: number
  status: 'approved' | 'pending' | 'reported'
}

interface Notification {
  id: number
  type: 'like' | 'comment' | 'follow' | 'order' | 'message' | 'alert' | 'system'
  title: string
  message: string
  time: string
  read: boolean
  icon: React.ReactNode
}

interface Subscriber {
  id: number
  name: string
  avatar: string
  joinedAt: string
  status: 'active' | 'inactive' | 'new'
  location: string
}

interface CalendarEvent {
  id: number
  title: string
  date: string
  type: 'publication' | 'live' | 'deadline' | 'reminder'
  status: 'scheduled' | 'published' | 'draft'
}

// ============================================
// DATA
// ============================================

const projects: Project[] = [
  { id: 1, title: "Bonnet ours adorable", image: "/images/projects/bear-hat.png", likes: 24, comments: 8, views: 340, creator: { name: "Marie C.", avatar: "/images/creators/creator1.png" }, tag: "Accessoires", description: "Un adorable bonnet en forme d'ours pour les bébés." },
  { id: 2, title: "Lapin amigurumi mint", image: "/images/projects/bunny.png", likes: 156, comments: 23, views: 890, creator: { name: "Sophie L.", avatar: "/images/creators/creator2.png" }, tag: "Jouets", description: "Un lapin amigurumi doux en couleur menthe." },
  { id: 3, title: "Couverture granny square", image: "/images/projects/blanket.png", likes: 89, comments: 15, views: 560, creator: { name: "Claire D.", avatar: "/images/creators/creator3.png" }, tag: "Maison", description: "Une couverture colorée en granny square." },
  { id: 4, title: "Cardigan bébé pastel", image: "/images/projects/cardigan.png", likes: 67, comments: 12, views: 450, creator: { name: "Emma R.", avatar: "/images/creators/creator4.png" }, tag: "Vêtements", description: "Un cardigan doux pour bébé." },
  { id: 5, title: "Sac marché bohème", image: "/images/projects/bag.png", likes: 45, comments: 9, views: 320, creator: { name: "Léa M.", avatar: "/images/creators/creator5.png" }, tag: "Accessoires", description: "Un sac de marché bohème." },
  { id: 6, title: "Bouquet de fleurs", image: "/images/projects/flowers.png", likes: 112, comments: 18, views: 670, creator: { name: "Anaïs P.", avatar: "/images/creators/creator6.png" }, tag: "Maison", description: "Un bouquet de fleurs crochetées." },
]

const creators: Creator[] = [
  { id: 1, name: "Marie Crochet", avatar: "/images/creators/creator1.png", specialty: "Amigurumi", followers: "12.5k", bio: "Passionnée par les amigurumi depuis 5 ans.", location: "Paris, France", projects: 45 },
  { id: 2, name: "Sophie Artisan", avatar: "/images/creators/creator2.png", specialty: "Vêtements", followers: "8.3k", bio: "Créatrice de vêtements crochet.", location: "Lyon, France", projects: 32 },
  { id: 3, name: "Claire Créative", avatar: "/images/creators/creator3.png", specialty: "Maison", followers: "15.2k", bio: "Décoration maison et accessoires.", location: "Bordeaux, France", projects: 67 },
  { id: 4, name: "Emma FaitMain", avatar: "/images/creators/creator4.png", specialty: "Bébé", followers: "6.7k", bio: "Spécialiste des créations pour bébés.", location: "Nantes, France", projects: 28 },
  { id: 5, name: "Léa Bohème", avatar: "/images/creators/creator5.png", specialty: "Accessoires", followers: "9.1k", bio: "Sacs et accessoires originaux.", location: "Marseille, France", projects: 51 },
  { id: 6, name: "Anaïs Design", avatar: "/images/creators/creator6.png", specialty: "Patrons", followers: "11.4k", bio: "Créatrice de patrons PDF.", location: "Toulouse, France", projects: 89 },
]

const initialProducts: Product[] = [
  {
    id: 1,
    title: "Patron Lapin Amigurumi",
    image: "/images/projects/bunny.png",
    price: 8.99,
    category: "Patrons",
    creator: "Sophie L.",
    creatorId: 2,
    creatorAvatar: "/images/creators/creator2.png",
    rating: 4.8,
    reviews: 45,
    stock: 999,
    createdAt: "2024-01-15",
    description: "Créez un adorable lapin amigurumi avec ce patron PDF détaillé. Parfait pour les débutants comme pour les crocheteurs expérimentés. Ce modèle inclut des instructions pas à pas avec des photos pour chaque étape.",
    details: ["Patron PDF de 12 pages avec photos", "Instructions détaillées étape par étape", "Guide des points utilisés inclus", "Taille finale: 20cm de hauteur", "Compatible débutant"],
    materials: ["Coton mercerisé 3.5mm", "Crochet 3mm", "Rembourrage polyester", "Yeux de sécurité 8mm", "Aiguille à laine"],
    difficulty: "Débutant",
    timeToComplete: "4-6 heures",
    language: "Français",
    pages: 12,
    featured: true
  },
  {
    id: 2,
    title: "Kit Bonnet Ourson",
    image: "/images/projects/bear-hat.png",
    price: 24.99,
    category: "Kits",
    creator: "Marie C.",
    creatorId: 1,
    creatorAvatar: "/images/creators/creator1.png",
    rating: 4.9,
    reviews: 32,
    stock: 25,
    createdAt: "2024-02-10",
    description: "Kit complet pour créer un bonnet ourson adorable pour bébé. Ce kit contient tout le matériel nécessaire ainsi que le patron détaillé. Parfait pour offrir ou pour commencer le crochet!",
    details: ["Kit complet avec tout le matériel inclus", "Laine premium hypoallergénique", "Patron détaillé avec schémas", "Taille: 6-12 mois (adaptable)", "Idée cadeau parfaite"],
    materials: ["Laine 100% coton bio", "Crochet 4mm inclus", "Boutons en bois", "Fourniture de marque-page", "Patron imprimé"],
    difficulty: "Intermédiaire",
    timeToComplete: "6-8 heures",
    language: "Français",
    pages: 8,
    featured: true
  },
  {
    id: 3,
    title: "Patron Cardigan Bébé",
    image: "/images/projects/cardigan.png",
    price: 12.99,
    category: "Patrons",
    creator: "Emma R.",
    creatorId: 4,
    creatorAvatar: "/images/creators/creator4.png",
    rating: 4.7,
    reviews: 28,
    stock: 999,
    createdAt: "2024-02-20",
    description: "Un patron élégant pour créer un cardigan bébé doux et confortable. Ce modèle features des manches longues et une jolie bordure en point d'écrevisse.",
    details: ["Patron PDF de 18 pages", "5 tailles incluses (prématuré à 24 mois)", "Schémas de montage détaillés", "Vidéo tutoriel incluse", "Support créateur par message"],
    materials: ["Laine mérinos douce", "Crochet 3.5mm", "Boutons nacre", "Marqueurs de mailles"],
    difficulty: "Intermédiaire",
    timeToComplete: "10-15 heures",
    language: "Français",
    pages: 18
  },
  {
    id: 4,
    title: "Kit Couverture Granny Square",
    image: "/images/projects/blanket.png",
    price: 45.99,
    category: "Kits",
    creator: "Claire D.",
    creatorId: 3,
    creatorAvatar: "/images/creators/creator3.png",
    rating: 4.9,
    reviews: 56,
    stock: 15,
    createdAt: "2024-03-01",
    description: "Ce kit premium contient tout le nécessaire pour créer une magnifique couverture granny square colorée. Y compris 15 pelotes de laine de qualité supérieure.",
    details: ["Kit complet premium", "15 pelotes de laine incluse", "Patron avec 10 motifs différents", "Taille finale: 120x150cm", "Livré dans un beau coffret cadeau"],
    materials: ["15 pelotes laine 100% coton", "Crochet 4mm inclus", "Aiguille à laine", "Patron détaillé", "Coffret de rangement"],
    difficulty: "Avancé",
    timeToComplete: "30-40 heures",
    language: "Français",
    pages: 24,
    featured: true
  },
  {
    id: 5,
    title: "Sac Bohème Chic",
    image: "/images/projects/bag.png",
    price: 18.99,
    category: "Accessoires",
    creator: "Léa M.",
    creatorId: 5,
    creatorAvatar: "/images/creators/creator5.png",
    rating: 4.6,
    reviews: 19,
    stock: 50,
    createdAt: "2024-03-05",
    description: "Patron pour créer un sac de marché bohème élégant et fonctionnel. Ce design moderne avec ses anses en bois est parfait pour les sorties.",
    details: ["Patron PDF de 10 pages", "Design moderne et élégant", "Doublure expliquée en détail", "Dimensions: 35x40x15cm", "Vidéo d'aide incluse"],
    materials: ["Coton cordé", "Ans en bois", "Doublure en coton", "Crochet 5mm", "Bouton pression"],
    difficulty: "Intermédiaire",
    timeToComplete: "12-15 heures",
    language: "Français",
    pages: 10
  },
  {
    id: 6,
    title: "Bouquet de Fleurs Éternelles",
    image: "/images/projects/flowers.png",
    price: 14.99,
    category: "Maison",
    creator: "Anaïs P.",
    creatorId: 6,
    creatorAvatar: "/images/creators/creator6.png",
    rating: 4.8,
    reviews: 41,
    stock: 999,
    createdAt: "2024-03-10",
    description: "Créez un magnifique bouquet de fleurs crochetées qui ne fanera jamais! Ce patron inclut 7 variétés de fleurs différentes.",
    details: ["7 motifs de fleurs différents", "Instructions d'assemblage", "Fleurs: roses, tournesols, tulipes...", "Idéal pour la décoration", "Niveau débutant à intermédiaire"],
    materials: ["Fil coton multicolore", "Fil floral", "Crochet 2.5mm", "Feutrine verte"],
    difficulty: "Intermédiaire",
    timeToComplete: "8-12 heures",
    language: "Français",
    pages: 16
  }
]

// Products Context
interface ProductsContextType {
  products: Product[]
  addProduct: (product: Omit<Product, 'id' | 'rating' | 'reviews' | 'createdAt'>) => void
  updateProduct: (id: number, updates: Partial<Product>) => void
  deleteProduct: (id: number) => void
}

const ProductsContext = createContext<ProductsContextType>({
  products: [],
  addProduct: () => {},
  updateProduct: () => {},
  deleteProduct: () => {}
})

const useProducts = () => useContext(ProductsContext)

// Cart Context
interface CartContextType {
  items: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  totalItems: 0,
  totalPrice: 0
})

const useCart = () => useContext(CartContext)

const categories = [
  { icon: Shirt, name: "Vêtements", count: 234, color: "bg-terracotta" },
  { icon: ShoppingCart, name: "Accessoires", count: 189, color: "bg-sage" },
  { icon: Home, name: "Maison", count: 156, color: "bg-mustard" },
  { icon: Baby, name: "Jouets", count: 98, color: "bg-coral" },
  { icon: FileText, name: "Patrons", count: 312, color: "bg-lavender" }
]

const menuItems = [
  { icon: LayoutDashboard, label: 'Tableau de bord', view: 'dashboard' as ViewType, active: true },
  { icon: FolderOpen, label: 'Mes Projets', view: 'dashboard' as ViewType },
  { icon: MessageSquare, label: 'Messages', view: 'messages' as ViewType, badge: 3 },
  { icon: MessageCircle, label: 'Commentaires', view: 'comments' as ViewType, badge: 12 },
  { icon: Heart, label: 'Favoris', view: 'profile' as ViewType },
  { icon: BarChart3, label: 'Statistiques', view: 'analytics' as ViewType },
  { icon: ShoppingBag, label: 'Boutique', view: 'shop-manage' as ViewType },
  { icon: CalendarDays, label: 'Planificateur', view: 'planner' as ViewType },
  { icon: Users, label: 'Abonnés', view: 'subscribers' as ViewType },
  { icon: Settings, label: 'Paramètres', view: 'profile' as ViewType },
  { icon: HelpCircle, label: 'Aide & Support', view: 'dashboard' as ViewType },
]

const statsCards = [
  { label: 'Publications', value: '24', trend: '+12%', trendUp: true, color: 'text-terracotta', icon: Camera },
  { label: 'Abonnés', value: '1,247', trend: '+8%', trendUp: true, color: 'text-sage', icon: Users },
  { label: 'Likes reçus', value: '3,856', trend: '+25%', trendUp: true, color: 'text-mustard', icon: Heart },
  { label: 'Vues', value: '12,450', trend: '+15%', trendUp: true, color: 'text-coral', icon: Eye },
]

const tableProjects = [
  { id: 1, title: 'Bonnet Ourson Hiver 2024', thumbnail: '/images/projects/bear-hat.png', category: 'Vêtements', status: 'published', likes: 156, views: 1240, comments: 23, date: '15 Mars 2024' },
  { id: 2, title: 'Lapin Amigurumi Mint', thumbnail: '/images/projects/bunny.png', category: 'Jouets', status: 'published', likes: 89, views: 890, comments: 15, date: '12 Mars 2024' },
  { id: 3, title: 'Couverture Granny Square', thumbnail: '/images/projects/blanket.png', category: 'Maison', status: 'draft', likes: 0, views: 45, comments: 0, date: '10 Mars 2024' },
  { id: 4, title: 'Cardigan Bébé Pastel', thumbnail: '/images/projects/cardigan.png', category: 'Vêtements', status: 'published', likes: 234, views: 1890, comments: 34, date: '8 Mars 2024' },
  { id: 5, title: 'Sac Marché Bohème', thumbnail: '/images/projects/bag.png', category: 'Accessoires', status: 'published', likes: 67, views: 560, comments: 8, date: '5 Mars 2024' },
  { id: 6, title: 'Bouquet de Fleurs', thumbnail: '/images/projects/flowers.png', category: 'Maison', status: 'archived', likes: 112, views: 980, comments: 18, date: '1 Mars 2024' },
]

const conversations: Conversation[] = [
  { id: 1, user: { name: "Sophie L.", avatar: "/images/creators/creator2.png" }, lastMessage: "J'adore votre patron du lapin!", time: "2min", unread: 2, online: true },
  { id: 2, user: { name: "Claire D.", avatar: "/images/creators/creator3.png" }, lastMessage: "Pouvez-vous m'aider pour le point...", time: "1h", unread: 0, online: false },
  { id: 3, user: { name: "Emma R.", avatar: "/images/creators/creator4.png" }, lastMessage: "Merci pour le conseil!", time: "3h", unread: 1, online: true },
  { id: 4, user: { name: "Léa M.", avatar: "/images/creators/creator5.png" }, lastMessage: "Quand est-ce que vous publiez...", time: "1j", unread: 0, online: false },
  { id: 5, user: { name: "Anaïs P.", avatar: "/images/creators/creator6.png" }, lastMessage: "Super collaboration!", time: "2j", unread: 0, online: true },
]

const messages: Message[] = [
  { id: 1, sender: { name: "Sophie L.", avatar: "/images/creators/creator2.png" }, content: "Bonjour! J'ai acheté votre patron du lapin amigurumi et je l'adore! 🐰", time: "10:30", isOwn: false },
  { id: 2, sender: { name: "Marie", avatar: "/images/creators/creator1.png" }, content: "Merci beaucoup Sophie! Je suis ravie qu'il vous plaise. N'hésitez pas si vous avez des questions!", time: "10:32", isOwn: true },
  { id: 3, sender: { name: "Sophie L.", avatar: "/images/creators/creator2.png" }, content: "En fait, j'ai une question sur l'assemblage des oreilles. Avez-vous un conseil?", time: "10:35", isOwn: false },
  { id: 4, sender: { name: "Marie", avatar: "/images/creators/creator1.png" }, content: "Bien sûr! Pour les oreilles, je vous conseille de les coudre avec le même fil que vous avez utilisé, en faisant plusieurs points discrets à la base.", time: "10:38", isOwn: true },
  { id: 5, sender: { name: "Sophie L.", avatar: "/images/creators/creator2.png" }, content: "Parfait, merci! Voici mon résultat:", time: "10:45", isOwn: false, image: "/images/projects/bunny.png" },
]

const comments: Comment[] = [
  { id: 1, user: { name: "Sophie L.", avatar: "/images/creators/creator2.png" }, content: "Magnifique création! J'adore les couleurs choisies.", time: "2min", project: "Bonnet Ourson", likes: 5, status: 'approved' },
  { id: 2, user: { name: "Claire D.", avatar: "/images/creators/creator3.png" }, content: "Pouvez-vous partager le patron?", time: "15min", project: "Lapin Amigurumi", likes: 3, status: 'approved' },
  { id: 3, user: { name: "Emma R.", avatar: "/images/creators/creator4.png" }, content: "Très beau travail!", time: "1h", project: "Cardigan Bébé", likes: 8, status: 'pending' },
  { id: 4, user: { name: "Léa M.", avatar: "/images/creators/creator5.png" }, content: "Contenu inapproprié signalé", time: "2h", project: "Couverture Granny", likes: 0, status: 'reported' },
  { id: 5, user: { name: "Anaïs P.", avatar: "/images/creators/creator6.png" }, content: "Quelle inspiration! Je vais essayer.", time: "3h", project: "Sac Bohème", likes: 12, status: 'approved' },
]

const notifications: Notification[] = [
  { id: 1, type: 'like', title: 'Nouveau like', message: 'Sophie L. a aimé votre projet "Bonnet Ourson"', time: '2min', read: false, icon: <Heart className="w-4 h-4 text-terracotta" /> },
  { id: 2, type: 'comment', title: 'Nouveau commentaire', message: 'Claire D. a commenté "Lapin Amigurumi"', time: '15min', read: false, icon: <MessageCircle className="w-4 h-4 text-sage" /> },
  { id: 3, type: 'follow', title: 'Nouvel abonné', message: 'Emma R. vous suit maintenant', time: '1h', read: false, icon: <UserPlus className="w-4 h-4 text-mustard" /> },
  { id: 4, type: 'order', title: 'Nouvelle commande', message: 'Patron Lapin vendu pour 8.99€', time: '2h', read: true, icon: <ShoppingBag className="w-4 h-4 text-sage" /> },
  { id: 5, type: 'message', title: 'Nouveau message', message: 'Vous avez 3 messages non lus', time: '3h', read: true, icon: <MessageSquare className="w-4 h-4 text-coral" /> },
  { id: 6, type: 'alert', title: 'Rappel', message: 'Complétez votre profil pour plus de visibilité', time: '1j', read: true, icon: <AlertCircle className="w-4 h-4 text-coral" /> },
]

const subscribers: Subscriber[] = [
  { id: 1, name: "Sophie Laurent", avatar: "/images/creators/creator2.png", joinedAt: "Mars 2024", status: "active", location: "Paris" },
  { id: 2, name: "Claire Dubois", avatar: "/images/creators/creator3.png", joinedAt: "Février 2024", status: "active", location: "Lyon" },
  { id: 3, name: "Emma Martin", avatar: "/images/creators/creator4.png", joinedAt: "Janvier 2024", status: "new", location: "Bordeaux" },
  { id: 4, name: "Léa Moreau", avatar: "/images/creators/creator5.png", joinedAt: "Décembre 2023", status: "inactive", location: "Nantes" },
  { id: 5, name: "Anaïs Petit", avatar: "/images/creators/creator6.png", joinedAt: "Mars 2024", status: "active", location: "Marseille" },
]

const calendarEvents: CalendarEvent[] = [
  { id: 1, title: "Publication Bonnet Printemps", date: "18 Mars", type: "publication", status: "scheduled" },
  { id: 2, title: "Live Tutoriel Amigurumi", date: "20 Mars", type: "live", status: "scheduled" },
  { id: 3, title: "Deadline Patron VIP", date: "22 Mars", type: "deadline", status: "draft" },
  { id: 4, title: "Rappel: Répondre aux messages", date: "23 Mars", type: "reminder", status: "scheduled" },
]

const shopStats = {
  totalSales: 1245.67,
  ordersCount: 45,
  pendingOrders: 3,
  topProduct: "Patron Lapin Amigurumi",
  stock: 156,
  lowStock: 5
}

// SuperAdmin Data
const platformStats: PlatformStats = {
  totalUsers: 45892,
  activeUsers: 12847,
  totalCreators: 3421,
  totalProjects: 89234,
  totalRevenue: 234567.89,
  monthlyGrowth: 23.5,
  newUsersToday: 234,
  pendingReports: 47
}

const platformUsers: PlatformUser[] = [
  { id: 1, name: "Marie Crochet", email: "marie@crochetti.com", avatar: "/images/creators/creator1.png", role: "creator", status: "active", joinedAt: "Jan 2024", lastActive: "2 min", projects: 45, followers: 12500, revenue: 2456.78, location: "Paris, France", verified: true },
  { id: 2, name: "Sophie Artisan", email: "sophie@crochetti.com", avatar: "/images/creators/creator2.png", role: "creator", status: "active", joinedAt: "Fév 2024", lastActive: "15 min", projects: 32, followers: 8300, revenue: 1234.56, location: "Lyon, France", verified: true },
  { id: 3, name: "Jean Dupont", email: "jean@email.com", avatar: "/images/creators/creator3.png", role: "user", status: "active", joinedAt: "Mars 2024", lastActive: "1h", projects: 0, followers: 234, revenue: 0, location: "Bordeaux, France", verified: false },
  { id: 4, name: "Admin Pierre", email: "pierre@crochetti.com", avatar: "/images/creators/creator4.png", role: "admin", status: "active", joinedAt: "Dec 2023", lastActive: "5 min", projects: 0, followers: 0, revenue: 0, location: "Paris, France", verified: true },
  { id: 5, name: "Claire Design", email: "claire@crochetti.com", avatar: "/images/creators/creator5.png", role: "creator", status: "suspended", joinedAt: "Jan 2024", lastActive: "2j", projects: 67, followers: 15200, revenue: 3456.78, location: "Marseille, France", verified: true },
  { id: 6, name: "Emma Bébé", email: "emma@crochetti.com", avatar: "/images/creators/creator6.png", role: "creator", status: "active", joinedAt: "Fév 2024", lastActive: "30 min", projects: 28, followers: 6700, revenue: 987.65, location: "Nantes, France", verified: false },
  { id: 7, name: "Lucas Martin", email: "lucas@email.com", avatar: "/images/creators/creator1.png", role: "user", status: "pending", joinedAt: "Mars 2024", lastActive: "3h", projects: 0, followers: 56, revenue: 0, location: "Lille, France", verified: false },
  { id: 8, name: "Camille Tricot", email: "camille@crochetti.com", avatar: "/images/creators/creator2.png", role: "creator", status: "active", joinedAt: "Jan 2024", lastActive: "1h", projects: 51, followers: 9100, revenue: 1567.89, location: "Toulouse, France", verified: true },
]

const reportedContent: ReportedContent[] = [
  { id: 1, type: "project", reportedBy: "Jean D.", reportedUser: "Claire Design", content: "Couverture Granny - Contenu potentiellement inapproprié signalé par plusieurs utilisateurs", reason: "Contenu inapproprié", status: "pending", reportedAt: "Il y a 2h", severity: "high" },
  { id: 2, type: "comment", reportedBy: "Marie C.", reportedUser: "Lucas Martin", content: "Ce commentaire est offensant et ne respecte pas les règles de la communauté...", reason: "Harcèlement", status: "pending", reportedAt: "Il y a 4h", severity: "medium" },
  { id: 3, type: "user", reportedBy: "Sophie L.", reportedUser: "Compte suspect", content: "Activité suspecte détectée - Possible compte spam", reason: "Spam", status: "reviewed", reportedAt: "Il y a 1j", severity: "low" },
  { id: 4, type: "message", reportedBy: "Emma R.", reportedUser: "Pierre A.", content: "Message non sollicité avec liens commerciaux", reason: "Spam commercial", status: "pending", reportedAt: "Il y a 6h", severity: "medium" },
  { id: 5, type: "project", reportedBy: "Admin", reportedUser: "Test User", content: "Violation des droits d'auteur - Image copiée", reason: "Copyright", status: "resolved", reportedAt: "Il y a 2j", severity: "high" },
]

const revenueData: RevenueData[] = [
  { month: "Jan", revenue: 18500, subscriptions: 8500, commissions: 6500, withdrawals: 3500 },
  { month: "Fév", revenue: 21200, subscriptions: 9200, commissions: 7500, withdrawals: 4500 },
  { month: "Mar", revenue: 19800, subscriptions: 8800, commissions: 6800, withdrawals: 4200 },
  { month: "Avr", revenue: 24500, subscriptions: 10500, commissions: 8800, withdrawals: 5200 },
  { month: "Mai", revenue: 28900, subscriptions: 12000, commissions: 10500, withdrawals: 6400 },
  { month: "Juin", revenue: 32500, subscriptions: 13500, commissions: 12000, withdrawals: 7000 },
]

const adminMenuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', view: 'superadmin' as ViewType },
  { icon: Users, label: 'Utilisateurs', view: 'admin-users' as ViewType },
  { icon: AlertTriangle, label: 'Modération', view: 'admin-content' as ViewType, badge: 47 },
  { icon: BarChart3, label: 'Analytics', view: 'admin-analytics' as ViewType },
  { icon: DollarSign, label: 'Revenus', view: 'admin-revenue' as ViewType },
  { icon: Settings, label: 'Paramètres', view: 'admin-settings' as ViewType },
  { icon: Globe, label: 'Retour au site', view: 'landing' as ViewType },
]

// ============================================
// CHART COMPONENTS
// ============================================

function SimpleLineChart() {
  const points = [30, 45, 35, 55, 48, 62, 58, 75, 68, 82, 78, 95]
  const svgWidth = 400
  const svgHeight = 150
  const padding = 20
  const chartWidth = svgWidth - padding * 2
  const chartHeight = svgHeight - padding * 2
  const maxVal = Math.max(...points)
  
  const pathPoints = points.map((val, i) => {
    const x = padding + (i / (points.length - 1)) * chartWidth
    const y = svgHeight - padding - (val / maxVal) * chartHeight
    return `${x},${y}`
  }).join(' ')
  
  const areaPath = `M${padding},${svgHeight - padding} L${pathPoints} L${svgWidth - padding},${svgHeight - padding} Z`

  return (
    <svg width="100%" height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E07A5F" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#E07A5F" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#lineGradient)" />
      <polyline points={pathPoints} fill="none" stroke="#E07A5F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {points.map((val, i) => {
        const x = padding + (i / (points.length - 1)) * chartWidth
        const y = svgHeight - padding - (val / maxVal) * chartHeight
        return <circle key={i} cx={x} cy={y} r="3" fill="#E07A5F" />
      })}
    </svg>
  )
}

function SimplePieChart() {
  const data = [
    { label: 'Amigurumi', value: 40, color: '#E07A5F' },
    { label: 'Vêtements', value: 30, color: '#81B29A' },
    { label: 'Maison', value: 20, color: '#F4D35E' },
    { label: 'Autres', value: 10, color: '#B8A9C9' },
  ]
  
  let cumulativePercent = 0
  const radius = 50
  const centerX = 60
  const centerY = 60
  
  const arcs = data.map((item) => {
    const startAngle = cumulativePercent * 3.6 * (Math.PI / 180)
    cumulativePercent += item.value
    const endAngle = cumulativePercent * 3.6 * (Math.PI / 180)
    
    const x1 = centerX + radius * Math.cos(startAngle - Math.PI / 2)
    const y1 = centerY + radius * Math.sin(startAngle - Math.PI / 2)
    const x2 = centerX + radius * Math.cos(endAngle - Math.PI / 2)
    const y2 = centerY + radius * Math.sin(endAngle - Math.PI / 2)
    
    const largeArc = item.value > 50 ? 1 : 0
    
    return {
      path: `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`,
      color: item.color,
      label: item.label,
      value: item.value
    }
  })

  return (
    <div className="flex items-center gap-4">
      <svg width="120" height="120" viewBox="0 0 120 120">
        {arcs.map((arc, i) => (
          <path key={i} d={arc.path} fill={arc.color} stroke="white" strokeWidth="1" />
        ))}
      </svg>
      <div className="space-y-2">
        {data.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-xs text-brown-light dark:text-white/70">{item.label}</span>
            <span className="text-xs font-medium text-brown dark:text-white">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================
// SHARED COMPONENTS
// ============================================

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full hover:bg-cream-dark dark:hover:bg-white/10"
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-brown-light" />
      ) : (
        <Sun className="w-5 h-5 text-white/70" />
      )}
    </Button>
  )
}

// Global Search Modal Component
function SearchModal({ isOpen, onClose, onNavigate }: { isOpen: boolean; onClose: () => void; onNavigate: (view: ViewType) => void }) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useState<HTMLInputElement | null>(null)[0]

  const searchResults: SearchResult[] = query.length > 1 ? [
    ...projects.filter(p => p.title.toLowerCase().includes(query.toLowerCase())).map(p => ({
      id: p.id, type: 'project' as const, title: p.title, subtitle: p.tag, image: p.image
    })),
    ...creators.filter(c => c.name.toLowerCase().includes(query.toLowerCase())).map(c => ({
      id: c.id, type: 'user' as const, title: c.name, subtitle: c.specialty, image: c.avatar
    })),
  ].slice(0, 8) : []

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        if (isOpen) onClose()
        else isOpen
      }
      if (e.key === 'Escape' && isOpen) onClose()
      if (isOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault()
          setSelectedIndex(prev => Math.min(prev + 1, searchResults.length - 1))
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault()
          setSelectedIndex(prev => Math.max(prev - 1, 0))
        }
        if (e.key === 'Enter' && searchResults[selectedIndex]) {
          const result = searchResults[selectedIndex]
          if (result.type === 'project') onNavigate('dashboard')
          else if (result.type === 'user') onNavigate('dashboard')
          onClose()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, onNavigate, selectedIndex, searchResults])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-xl bg-[#2D2416] border border-[#D4AF37]/30 rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
        {/* Search Input */}
        <div className="flex items-center gap-3 p-4 border-b border-[#D4AF37]/20">
          <Search className="w-5 h-5 text-[#D4AF37]" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Rechercher des projets, créateurs..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0) }}
            className="flex-1 bg-transparent text-[#F5F0E8] placeholder-[#B8A88A] outline-none text-lg"
            autoFocus
          />
          <kbd className="px-2 py-1 bg-[#1A1410] text-[#B8A88A] text-xs rounded border border-[#D4AF37]/20">ESC</kbd>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {query.length < 2 ? (
            <div className="p-8 text-center">
              <Search className="w-12 h-12 text-[#B8A88A]/40 mx-auto mb-3" />
              <p className="text-[#B8A88A]">Tapez pour rechercher...</p>
              <div className="mt-4 flex items-center justify-center gap-2">
                <kbd className="px-2 py-1 bg-[#1A1410] text-[#B8A88A] text-xs rounded border border-[#D4AF37]/20">Ctrl</kbd>
                <span className="text-[#B8A88A]">+</span>
                <kbd className="px-2 py-1 bg-[#1A1410] text-[#B8A88A] text-xs rounded border border-[#D4AF37]/20">K</kbd>
              </div>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-[#B8A88A]">Aucun résultat pour "{query}"</p>
            </div>
          ) : (
            <div className="p-2">
              {searchResults.map((result, i) => (
                <button
                  key={`${result.type}-${result.id}`}
                  onClick={() => { onNavigate('dashboard'); onClose() }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
                    i === selectedIndex ? 'bg-[#D4AF37]/20' : 'hover:bg-[#D4AF37]/10'
                  }`}
                >
                  {result.image ? (
                    <img src={result.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/20 flex items-center justify-center">
                      {result.type === 'project' ? <FolderOpen className="w-5 h-5 text-[#D4AF37]" /> : <User className="w-5 h-5 text-[#D4AF37]" />}
                    </div>
                  )}
                  <div className="flex-1 text-left">
                    <p className="text-[#F5F0E8] font-medium">{result.title}</p>
                    <p className="text-sm text-[#B8A88A]">{result.subtitle}</p>
                  </div>
                  <Badge className={
                    result.type === 'project' ? 'bg-[#E07A5F]/20 text-[#E07A5F]' :
                    result.type === 'user' ? 'bg-[#81B29A]/20 text-[#81B29A]' :
                    'bg-[#D4AF37]/20 text-[#D4AF37]'
                  }>
                    {result.type === 'project' ? 'Projet' : result.type === 'user' ? 'Créateur' : 'Produit'}
                  </Badge>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-3 border-t border-[#D4AF37]/20 text-xs text-[#B8A88A]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-[#1A1410] rounded">↑↓</kbd> Naviguer</span>
            <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-[#1A1410] rounded">↵</kbd> Sélectionner</span>
          </div>
          <span>{searchResults.length} résultats</span>
        </div>
      </div>
    </div>
  )
}

// Add Product Modal Component
function AddProductModal({ isOpen, onClose, onAdd }: {
  isOpen: boolean
  onClose: () => void
  onAdd: (product: Omit<Product, 'id' | 'rating' | 'reviews' | 'createdAt'>) => void
}) {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Patrons')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('/images/projects/bunny.png')
  const [stock, setStock] = useState('999')

  const handleSubmit = () => {
    if (!title || !price) return
    onAdd({
      title,
      price: parseFloat(price),
      category,
      description,
      image,
      stock: parseInt(stock),
      creator: 'Marie C.'
    })
    // Reset form
    setTitle('')
    setPrice('')
    setDescription('')
    setStock('999')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-[#2D2416] border border-[#D4AF37]/30 rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#D4AF37]/20">
          <h3 className="text-lg font-semibold text-[#F5F0E8]" style={{ fontFamily: 'Playfair Display, serif' }}>
            Ajouter un Article
          </h3>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-[#B8A88A] hover:text-[#F5F0E8]">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Form */}
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm text-[#B8A88A] mb-1">Titre du produit *</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Patron Peluche Chat"
              className="bg-[#1A1410] border-[#D4AF37]/20 text-[#F5F0E8] placeholder-[#B8A88A]/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#B8A88A] mb-1">Prix (€) *</label>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="9.99"
                className="bg-[#1A1410] border-[#D4AF37]/20 text-[#F5F0E8] placeholder-[#B8A88A]/50"
              />
            </div>
            <div>
              <label className="block text-sm text-[#B8A88A] mb-1">Catégorie</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-[#1A1410] border border-[#D4AF37]/20 rounded-lg text-[#F5F0E8]"
              >
                <option value="Patrons">Patrons</option>
                <option value="Kits">Kits</option>
                <option value="Accessoires">Accessoires</option>
                <option value="Vêtements">Vêtements</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm text-[#B8A88A] mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez votre produit..."
              rows={3}
              className="w-full px-3 py-2 bg-[#1A1410] border border-[#D4AF37]/20 rounded-lg text-[#F5F0E8] placeholder-[#B8A88A]/50 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#B8A88A] mb-1">Stock</label>
              <Input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="999"
                className="bg-[#1A1410] border-[#D4AF37]/20 text-[#F5F0E8] placeholder-[#B8A88A]/50"
              />
            </div>
            <div>
              <label className="block text-sm text-[#B8A88A] mb-1">Image URL</label>
              <Input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="/images/..."
                className="bg-[#1A1410] border-[#D4AF37]/20 text-[#F5F0E8] placeholder-[#B8A88A]/50"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-4 border-t border-[#D4AF37]/20">
          <Button variant="outline" onClick={onClose} className="border-[#D4AF37]/30 text-[#B8A88A] hover:text-[#F5F0E8]">
            Annuler
          </Button>
          <Button onClick={handleSubmit} className="bg-[#D4AF37] hover:bg-[#B8962F] text-[#1A1410]">
            <Plus className="w-4 h-4 mr-2" /> Ajouter
          </Button>
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project, onLike }: { project: Project; onLike?: (id: number) => void }) {
  const [isLiked, setIsLiked] = useState(project.liked || false)
  const [likeCount, setLikeCount] = useState(project.likes)
  const [isHovered, setIsHovered] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)
    onLike?.(project.id)
  }

  return (
    <Card 
      className="group bg-white dark:bg-brown-light border-border dark:border-white/10 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden animate-fade-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className={`absolute inset-0 bg-brown/40 transition-opacity duration-300 flex items-center justify-center gap-4 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <Button size="icon" variant="secondary" className="rounded-full bg-white/90 hover:bg-white" onClick={handleLike}>
            <Heart className={`w-5 h-5 transition-colors ${isLiked ? 'text-terracotta fill-terracotta' : 'text-terracotta'}`} />
          </Button>
          <Button size="icon" variant="secondary" className="rounded-full bg-white/90 hover:bg-white">
            <MessageCircle className="w-5 h-5 text-sage" />
          </Button>
          <Button size="icon" variant="secondary" className="rounded-full bg-white/90 hover:bg-white">
            <Bookmark className="w-5 h-5 text-mustard" />
          </Button>
        </div>
        <Badge className="absolute top-3 left-3 bg-white/90 dark:bg-brown/90 text-brown-light dark:text-white text-xs">{project.tag}</Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium text-brown dark:text-white text-sm mb-2 truncate">{project.title}</h3>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Heart className={`w-4 h-4 ${isLiked ? 'text-terracotta fill-terracotta' : 'text-terracotta'}`} />
            <span className="text-sm text-brown-light dark:text-white/70">{likeCount}</span>
            <MessageCircle className="w-4 h-4 text-sage ml-2" />
            <span className="text-sm text-brown-light dark:text-white/70">{project.comments}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Avatar className="w-6 h-6 border border-sage">
            <AvatarImage src={project.creator.avatar} alt={project.creator.name} />
            <AvatarFallback className="bg-sage text-white text-xs">{project.creator.name[0]}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-brown dark:text-white font-medium">{project.creator.name}</span>
        </div>
      </CardContent>
    </Card>
  )
}

// ============================================
// TOAST NOTIFICATION COMPONENT
// ============================================

function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error' | 'info'; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  const bgColor = type === 'success' ? 'bg-[#81B29A]' : type === 'error' ? 'bg-[#C96850]' : 'bg-[#D4AF37]'

  return (
    <div className={`fixed top-4 right-4 z-[200] ${bgColor} text-white px-6 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-slide-in`}>
      {type === 'success' && <CheckCircle className="w-5 h-5" />}
      {type === 'error' && <XCircle className="w-5 h-5" />}
      {type === 'info' && <AlertCircle className="w-5 h-5" />}
      <span className="font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-70"><X className="w-4 h-4" /></button>
    </div>
  )
}

// ============================================
// ADD ADMIN MODAL
// ============================================

function AddAdminModal({ isOpen, onClose, onAdd }: {
  isOpen: boolean
  onClose: () => void
  onAdd: (user: { name: string; email: string; role: 'admin' | 'creator' | 'user' }) => void
}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<'admin' | 'creator' | 'user'>('admin')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {}
    if (!name.trim()) newErrors.name = 'Nom requis'
    if (!email.trim()) newErrors.email = 'Email requis'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Email invalide'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onAdd({ name, email, role })
    setName('')
    setEmail('')
    setRole('admin')
    setErrors({})
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-[#1A1410] border border-[rgba(212,175,55,0.3)] rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-[rgba(212,175,55,0.2)]">
          <h3 className="text-lg font-semibold text-[#F5F0E8]">Ajouter un utilisateur</h3>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-[#B8A88A] hover:text-[#F5F0E8]">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <Label className="text-[#B8A88A] mb-1 block">Nom complet *</Label>
            <Input
              value={name}
              onChange={(e) => { setName(e.target.value); if (errors.name) setErrors(prev => ({ ...prev, name: '' })) }}
              placeholder="Jean Dupont"
              className={`bg-[#0D0A08] border-[rgba(212,175,55,0.2)] text-[#F5F0E8] ${errors.name ? 'border-red-500' : ''}`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <Label className="text-[#B8A88A] mb-1 block">Email *</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors(prev => ({ ...prev, email: '' })) }}
              placeholder="jean@exemple.com"
              className={`bg-[#0D0A08] border-[rgba(212,175,55,0.2)] text-[#F5F0E8] ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <Label className="text-[#B8A88A] mb-1 block">Rôle</Label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as 'admin' | 'creator' | 'user')}
              className="w-full px-3 py-2 bg-[#0D0A08] border border-[rgba(212,175,55,0.2)] rounded-lg text-[#F5F0E8]"
            >
              <option value="admin">Admin</option>
              <option value="creator">Créateur</option>
              <option value="user">Utilisateur</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-4 border-t border-[rgba(212,175,55,0.2)]">
          <Button variant="outline" onClick={onClose} className="border-[rgba(212,175,55,0.3)] text-[#B8A88A]">
            Annuler
          </Button>
          <Button onClick={handleSubmit} className="bg-[#D4AF37] hover:bg-[#B8962F] text-[#0D0A08]">
            <UserPlus className="w-4 h-4 mr-2" /> Ajouter
          </Button>
        </div>
      </div>
    </div>
  )
}

// ============================================
// CONFIRM MODAL
// ============================================

function ConfirmModal({ isOpen, onClose, onConfirm, title, message, confirmText, variant = 'danger' }: {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText: string
  variant?: 'danger' | 'warning' | 'info'
}) {
  if (!isOpen) return null

  const buttonColor = variant === 'danger' ? 'bg-[#C96850] hover:bg-[#A85A43]' : 
                      variant === 'warning' ? 'bg-[#D4AF37] hover:bg-[#B8962F] text-[#0D0A08]' : 
                      'bg-[#81B29A] hover:bg-[#6A9B84]'

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-[#1A1410] border border-[rgba(212,175,55,0.3)] rounded-2xl shadow-2xl p-6 text-center">
        <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
          variant === 'danger' ? 'bg-[#C96850]/20' : variant === 'warning' ? 'bg-[#D4AF37]/20' : 'bg-[#81B29A]/20'
        }`}>
          <AlertTriangle className={`w-8 h-8 ${
            variant === 'danger' ? 'text-[#C96850]' : variant === 'warning' ? 'text-[#D4AF37]' : 'text-[#81B29A]'
          }`} />
        </div>
        <h3 className="text-lg font-semibold text-[#F5F0E8] mb-2">{title}</h3>
        <p className="text-[#B8A88A] text-sm mb-6">{message}</p>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1 border-[rgba(212,175,55,0.3)] text-[#B8A88A]">
            Annuler
          </Button>
          <Button onClick={() => { onConfirm(); onClose() }} className={`flex-1 ${buttonColor} text-white`}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  )
}

// ============================================
// USER DETAIL MODAL
// ============================================

function UserDetailModal({ isOpen, onClose, user, onSuspend, onActivate }: {
  isOpen: boolean
  onClose: () => void
  user: PlatformUser | null
  onSuspend: () => void
  onActivate: () => void
}) {
  if (!isOpen || !user) return null

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-[#1A1410] border border-[rgba(212,175,55,0.3)] rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="w-20 h-20 border-4 border-[#D4AF37]">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-[#D4AF37] text-[#0D0A08] text-2xl">{user.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-semibold text-[#F5F0E8]">{user.name}</h3>
                {user.verified && <CheckCircle className="w-5 h-5 text-[#D4AF37]" />}
              </div>
              <p className="text-[#B8A88A]">{user.email}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge className={`${
                  user.role === 'superadmin' ? 'bg-[#D4AF37]/20 text-[#D4AF37]' :
                  user.role === 'admin' ? 'bg-[#81B29A]/20 text-[#81B29A]' :
                  user.role === 'creator' ? 'bg-[#C96850]/20 text-[#C96850]' :
                  'bg-[#B8A88A]/20 text-[#B8A88A]'
                }`}>
                  {user.role === 'superadmin' ? 'SuperAdmin' : user.role === 'admin' ? 'Admin' : user.role === 'creator' ? 'Créateur' : 'Utilisateur'}
                </Badge>
                <Badge className={`${
                  user.status === 'active' ? 'bg-[#81B29A]/20 text-[#81B29A]' :
                  user.status === 'suspended' ? 'bg-[#C96850]/20 text-[#C96850]' :
                  'bg-[#D4AF37]/20 text-[#D4AF37]'
                }`}>
                  {user.status === 'active' ? 'Actif' : user.status === 'suspended' ? 'Suspendu' : 'En attente'}
                </Badge>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-[#0D0A08] rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-[#D4AF37]">{user.projects}</p>
              <p className="text-xs text-[#B8A88A]">Projets</p>
            </div>
            <div className="bg-[#0D0A08] rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-[#D4AF37]">{user.followers.toLocaleString()}</p>
              <p className="text-xs text-[#B8A88A]">Abonnés</p>
            </div>
            <div className="bg-[#0D0A08] rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-[#81B29A]">{user.revenue > 0 ? `${user.revenue.toFixed(0)}€` : '-'}</p>
              <p className="text-xs text-[#B8A88A]">Revenus</p>
            </div>
            <div className="bg-[#0D0A08] rounded-xl p-4 text-center">
              <p className="text-sm font-bold text-[#F5F0E8]">{user.location}</p>
              <p className="text-xs text-[#B8A88A]">Localisation</p>
            </div>
          </div>

          <div className="space-y-2 text-sm mb-6">
            <div className="flex justify-between text-[#B8A88A]">
              <span>Inscrit le</span>
              <span className="text-[#F5F0E8]">{user.joinedAt}</span>
            </div>
            <div className="flex justify-between text-[#B8A88A]">
              <span>Dernière activité</span>
              <span className="text-[#F5F0E8]">{user.lastActive}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1 border-[rgba(212,175,55,0.3)] text-[#B8A88A]">
              Fermer
            </Button>
            {user.status === 'active' ? (
              <Button onClick={() => { onSuspend(); onClose() }} className="flex-1 bg-[#C96850] hover:bg-[#A85A43] text-white">
                <Ban className="w-4 h-4 mr-2" /> Suspendre
              </Button>
            ) : (
              <Button onClick={() => { onActivate(); onClose() }} className="flex-1 bg-[#81B29A] hover:bg-[#6A9B84] text-white">
                <UserCheck className="w-4 h-4 mr-2" /> Activer
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// LUXURY LANDING PAGE COMPONENT
// ============================================

function LuxuryLandingPage({ onNavigate, products: externalProducts }: { onNavigate: (view: ViewType) => void; products?: Product[] }) {
  const [email, setEmail] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const stats = [
    { value: '15K+', label: 'Créateurs d\'Exception', icon: Crown },
    { value: '50K+', label: 'Projets Uniques', icon: Sparkles },
    { value: '100K+', label: 'Membres Passionnés', icon: Users },
    { value: '5K+', label: 'Patrons Exclusifs', icon: FileText },
  ]

  const categories = [
    { name: 'Vêtements Haute Couture', count: 234, image: '/images/landing/cat-fashion.png' },
    { name: 'Accessoires Luxe', count: 189, image: '/images/landing/cat-accessories.png' },
    { name: 'Maison & Déco', count: 156, image: '/images/landing/cat-home.png' },
    { name: 'Jouets d\'Art', count: 98, image: '/images/landing/cat-baby.png' },
    { name: 'Patrons Premium', count: 312, image: '/images/landing/cat-patterns.png' },
  ]

  const featuredProjects = [
    { id: 1, title: 'Cardigan Bébé Deluxe', image: '/images/landing/project-featured.png', creator: 'Marie Crochet', likes: 156, featured: true },
    { id: 2, title: 'Lapin Amigurumi Mint', image: '/images/landing/project-amigurumi.png', creator: 'Sophie Art', likes: 89 },
    { id: 3, title: 'Couverture Granny Luxe', image: '/images/landing/project-blanket.png', creator: 'Claire Design', likes: 234 },
    { id: 4, title: 'Sac Bohème Chic', image: '/images/landing/project-bag.png', creator: 'Léa Mode', likes: 67 },
    { id: 5, title: 'Bouquet de Fleurs', image: '/images/landing/project-flowers.png', creator: 'Anaïs Fleur', likes: 112 },
    { id: 6, title: 'Bonnet Ourson Premium', image: '/images/landing/project-bear.png', creator: 'Emma Bébé', likes: 98 },
  ]

  const premiumCreators = [
    { name: 'Marie Crochet', avatar: '/images/landing/creator1.png', specialty: 'Amigurumi', followers: '12.5K', verified: true },
    { name: 'Sophie Artisan', avatar: '/images/landing/creator2.png', specialty: 'Vêtements', followers: '8.3K', verified: true },
    { name: 'Claire Créative', avatar: '/images/landing/creator3.png', specialty: 'Maison', followers: '15.2K', verified: true },
    { name: 'Emma Design', avatar: '/images/landing/creator4.png', specialty: 'Bébé', followers: '6.7K', verified: false },
  ]

  const testimonials = [
    { name: 'Marie C.', location: 'Dakar', text: 'Crochetti a transformé ma passion en véritable entreprise. Une communauté d\'excellence !', rating: 5 },
    { name: 'Sophie L.', location: 'Paris', text: 'Les patrons premium sont d\'une qualité exceptionnelle. Je recommande vivement !', rating: 5 },
    { name: 'Claire D.', location: 'Lyon', text: 'Grâce à Crochetti, j\'ai pu monétiser mes créations et vivre de ma passion.', rating: 5 },
  ]

  const features = [
    { icon: Globe, title: 'Visibilité Internationale', description: 'Partagez vos créations avec une audience mondiale passionnée' },
    { icon: Crown, title: 'Monétisation Simplifiée', description: 'Vendez vos patrons et créations facilement avec notre système intégré' },
    { icon: Users, title: 'Communauté d\'Élite', description: 'Rejoignez les meilleurs créateurs et apprenez des experts' },
  ]

  // Use external products if provided, otherwise use default
  const displayProducts = externalProducts || []

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF9F6] to-[#FDFCF0]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#E07A5F]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <span className="font-fredoka text-2xl font-bold bg-gradient-to-r from-[#E07A5F] to-[#D4AF37] bg-clip-text text-transparent">
              Crochetti
            </span>
            <div className="hidden md:flex items-center gap-8">
              <a href="#categories" className="text-[#3D2914]/70 hover:text-[#E07A5F] transition-colors text-sm font-medium">Explorer</a>
              <button onClick={() => onNavigate('creators')} className="text-[#3D2914]/70 hover:text-[#E07A5F] transition-colors text-sm font-medium">Créateurs</button>
              <button onClick={() => onNavigate('boutique')} className="text-[#3D2914]/70 hover:text-[#D4AF37] transition-colors text-sm font-medium flex items-center gap-1">
                <ShoppingBag className="w-4 h-4" /> Boutique
              </button>
              <a href="#features" className="text-[#3D2914]/70 hover:text-[#E07A5F] transition-colors text-sm font-medium">Fonctionnalités</a>
              <a href="#pricing" className="text-[#3D2914]/70 hover:text-[#E07A5F] transition-colors text-sm font-medium">Tarifs</a>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline"
                className="border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-full"
                onClick={() => onNavigate('boutique')}
              >
                <ShoppingBag className="w-4 h-4 mr-2" /> Boutique
              </Button>
              <Button 
                variant="ghost" 
                className="text-[#3D2914] hover:bg-[#E07A5F]/10"
                onClick={() => onNavigate('dashboard')}
              >
                Connexion
              </Button>
              <Button 
                className="bg-gradient-to-r from-[#E07A5F] to-[#c96b52] text-white rounded-full px-6 hover:shadow-lg hover:shadow-[#E07A5F]/30 transition-all"
                onClick={() => onNavigate('dashboard')}
              >
                Commencer
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background */}
        <div className="absolute inset-0">
          <img 
            src="/images/landing/hero-bg.png" 
            alt="Crochet background" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF9F6] via-transparent to-[#FDFCF0]" />
        </div>
        
        {/* Floating Elements Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-8 h-8 rounded-full opacity-20"
              style={{
                background: `linear-gradient(135deg, ${i % 2 === 0 ? '#E07A5F' : '#D4AF37'}, transparent)`,
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
                animation: `float ${4 + i}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className={`relative z-10 max-w-6xl mx-auto px-4 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Logo with Shimmer */}
          <div className="mb-6">
            <span className="font-fredoka text-5xl md:text-7xl font-bold bg-gradient-to-r from-[#E07A5F] via-[#D4AF37] to-[#E07A5F] bg-clip-text text-transparent animate-shimmer">
              Crochetti
            </span>
          </div>
          
          {/* Headline */}
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-[#2D2416] mb-6 leading-tight">
            L'Art du Crochet
            <span className="block mt-2 bg-gradient-to-r from-[#E07A5F] to-[#D4AF37] bg-clip-text text-transparent">
              Sublimé
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-[#3D2914]/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            Rejoignez l'élite des créateurs et transformez votre passion en succès. 
            Une communauté premium dédiée à l'excellence du crochet artisanal.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button 
              size="lg"
              className="group bg-gradient-to-r from-[#E07A5F] to-[#c96b52] text-white rounded-full px-8 py-6 text-lg hover:shadow-xl hover:shadow-[#E07A5F]/30 transition-all duration-300"
              onClick={() => onNavigate('dashboard')}
            >
              Commencer l'Aventure
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="rounded-full px-8 py-6 text-lg border-2 border-[#E07A5F] text-[#E07A5F] hover:bg-[#E07A5F] hover:text-white transition-all duration-300"
              onClick={() => onNavigate('explorer')}
            >
              Explorer la Collection
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="animate-bounce">
            <ChevronDown className="w-8 h-8 text-[#E07A5F] mx-auto" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-[#3D2914] to-[#5a3d1e] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-transparent mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-[#D4AF37]" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/70 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#2D2416] mb-4">
              Explorez l'Excellence
            </h2>
            <p className="text-[#3D2914]/70 max-w-2xl mx-auto">
              Découvrez des catégories soigneusement curated pour inspirer votre créativité
            </p>
          </div>
          
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {categories.map((category, index) => (
              <div 
                key={index}
                className="group flex-shrink-0 w-72 md:w-80 snap-center cursor-pointer"
              >
                <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2D2416] via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-xl font-semibold mb-2 group-hover:text-[#D4AF37] transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-[#D4AF37] text-sm">{category.count} projets</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-24 bg-gradient-to-b from-[#FAF9F6] to-[#FDFCF0]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#2D2416] mb-4">
              Créations d'Exception
            </h2>
            <p className="text-[#3D2914]/70 max-w-2xl mx-auto">
              Les œuvres les plus remarquables de notre communauté d'élite
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <div 
                key={project.id}
                className={`group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ${
                  index === 0 ? 'md:col-span-2 md:row-span-2 h-96 md:h-auto' : 'h-72'
                }`}
              >
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D2416] via-[#2D2416]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  {project.featured && (
                    <span className="inline-flex items-center gap-1 bg-[#D4AF37] text-[#2D2416] text-xs font-semibold px-3 py-1 rounded-full mb-2">
                      <Crown className="w-3 h-3" /> Coup de Cœur
                    </span>
                  )}
                  <h3 className="text-white text-lg font-semibold">{project.title}</h3>
                  <p className="text-white/70 text-sm">par {project.creator}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Heart className="w-4 h-4 text-[#E07A5F]" />
                    <span className="text-white/70 text-sm">{project.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg"
              variant="outline"
              className="rounded-full px-8 border-2 border-[#E07A5F] text-[#E07A5F] hover:bg-[#E07A5F] hover:text-white"
              onClick={() => onNavigate('explorer')}
            >
              Voir toutes les créations
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Boutique Section - Featured Products */}
      <section className="py-24 bg-gradient-to-b from-[#FDFCF0] to-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8962F] flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                <Badge className="bg-[#E07A5F]/20 text-[#E07A5F] border border-[#E07A5F]/30">
                  Nouveautés
                </Badge>
              </div>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#2D2416] mb-4">
                Boutique Exclusive
              </h2>
              <p className="text-[#3D2914]/70 max-w-xl">
                Des patrons premium et kits complets créés par nos artisans d'exception
              </p>
            </div>
            <Button 
              size="lg"
              className="mt-6 md:mt-0 bg-gradient-to-r from-[#D4AF37] to-[#B8962F] text-[#1A1410] rounded-full px-8 hover:shadow-xl hover:shadow-[#D4AF37]/30"
              onClick={() => onNavigate('boutique')}
            >
              Voir toute la boutique
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                id: 1,
                title: "Patron Lapin Amigurumi",
                price: 8.99,
                image: "/images/projects/bunny.png",
                creator: "Marie C.",
                rating: 4.9,
                reviews: 127,
                category: "Patrons",
                difficulty: "Intermédiaire",
                featured: true
              },
              {
                id: 2,
                title: "Kit Complet Cardigan",
                price: 45.00,
                image: "/images/projects/cardigan.png",
                creator: "Sophie L.",
                rating: 4.8,
                reviews: 89,
                category: "Kits",
                difficulty: "Avancé"
              },
              {
                id: 3,
                title: "Patron Sac Bohème",
                price: 12.50,
                image: "/images/projects/bag.png",
                creator: "Claire D.",
                rating: 4.7,
                reviews: 64,
                category: "Accessoires",
                difficulty: "Débutant"
              },
              {
                id: 4,
                title: "Patron Couverture Granny",
                price: 15.00,
                image: "/images/projects/blanket.png",
                creator: "Emma R.",
                rating: 5.0,
                reviews: 203,
                category: "Maison",
                difficulty: "Intermédiaire",
                featured: true
              }
            ].map((product) => (
              <div 
                key={product.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-[#E8E5D8]"
                onClick={() => onNavigate('boutique')}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.featured && (
                    <div className="absolute top-3 left-3 bg-[#D4AF37] text-[#1A1410] text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Vedette
                    </div>
                  )}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[#3D2914] text-xs font-medium px-3 py-1 rounded-full">
                    {product.category}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2D2416]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button 
                      className="w-full bg-[#E07A5F] hover:bg-[#C96850] text-white rounded-full"
                      onClick={(e) => { e.stopPropagation(); onNavigate('boutique'); }}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" /> Voir le produit
                    </Button>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      product.difficulty === 'Débutant' ? 'bg-[#81B29A]/20 text-[#81B29A]' :
                      product.difficulty === 'Intermédiaire' ? 'bg-[#D4AF37]/20 text-[#D4AF37]' :
                      'bg-[#E07A5F]/20 text-[#E07A5F]'
                    }`}>
                      {product.difficulty}
                    </span>
                  </div>
                  <h3 className="font-semibold text-[#2D2416] mb-1 truncate group-hover:text-[#D4AF37] transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-sm text-[#81B29A] mb-3">par {product.creator}</p>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-[#B8A88A]'}`} 
                      />
                    ))}
                    <span className="text-sm text-[#3D2914]/70 ml-1">({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#D4AF37]">{product.price.toFixed(2)}€</span>
                    <Heart className="w-5 h-5 text-[#B8A88A] hover:text-[#E07A5F] cursor-pointer transition-colors hover:fill-[#E07A5F]" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: "Livraison digitale", desc: "Téléchargement immédiat" },
              { icon: ShieldCheck, title: "Paiement sécurisé", desc: "Transactions cryptées" },
              { icon: Award, title: "Qualité garantie", desc: "Satisfait ou remboursé" },
              { icon: Users, title: "Support dédié", desc: "Assistance 7j/7" }
            ].map((badge, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-white/50 rounded-xl border border-[#E8E5D8]">
                <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                  <badge.icon className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div>
                  <p className="font-semibold text-[#2D2416] text-sm">{badge.title}</p>
                  <p className="text-xs text-[#3D2914]/60">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Creators Section */}
      <section id="creators" className="py-24 bg-[#3D2914] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50 L60 40 L70 50 L60 60 Z' fill='%23D4AF37' fill-opacity='0.5'/%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4">
              Les Maîtres Créateurs
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Rencontrez les talents d'exception qui façonnent l'univers Crochetti
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {premiumCreators.map((creator, index) => (
              <div 
                key={index}
                className="group text-center"
              >
                <div className="relative inline-block mb-4">
                  <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#D4AF37] group-hover:scale-105 transition-transform duration-300">
                    <img 
                      src={creator.avatar} 
                      alt={creator.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {creator.verified && (
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center">
                      <Check className="w-5 h-5 text-[#2D2416]" />
                    </div>
                  )}
                </div>
                <h3 className="text-white font-semibold text-lg mb-1">{creator.name}</h3>
                <p className="text-[#D4AF37] text-sm mb-2">{creator.specialty}</p>
                <div className="flex items-center justify-center gap-1 text-white/60 text-sm">
                  <Users className="w-4 h-4" />
                  {creator.followers} abonnés
                </div>
                <Button 
                  size="sm"
                  className="mt-4 rounded-full bg-gradient-to-r from-[#E07A5F] to-[#c96b52] text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Suivre
                </Button>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg"
              className="rounded-full px-8 bg-gradient-to-r from-[#D4AF37] to-[#B8962F] text-[#1A1410] hover:shadow-xl hover:shadow-[#D4AF37]/30"
              onClick={() => onNavigate('creators')}
            >
              Voir tous les créateurs
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-b from-[#FDFCF0] to-[#FAF9F6]">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#2D2416] mb-4">
              Ils Témoignent
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
                  ))}
                </div>
                <p className="text-[#3D2914]/80 italic mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E07A5F] to-[#D4AF37]" />
                  <div>
                    <p className="font-semibold text-[#2D2416]">{testimonial.name}</p>
                    <p className="text-sm text-[#3D2914]/60">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#2D2416] mb-4">
              Pourquoi Crochetti ?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E07A5F]/10 to-[#D4AF37]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-[#E07A5F]" />
                </div>
                <h3 className="text-xl font-semibold text-[#2D2416] mb-3">{feature.title}</h3>
                <p className="text-[#3D2914]/70 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter VIP Section */}
      <section className="py-24 bg-gradient-to-r from-[#E07A5F] to-[#c96b52] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='40' cy='40' r='30' stroke='%23fff' stroke-width='2' fill='none'/%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <Crown className="w-16 h-16 text-white/80 mx-auto mb-6" />
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4">
            Rejoignez le Cercle Privé
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Recevez exclusivités, patrons premium et invitations événements en avant-première
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/60 rounded-full px-6"
            />
            <Button 
              className="bg-white text-[#E07A5F] rounded-full px-8 hover:bg-[#D4AF37] hover:text-white transition-colors"
            >
              Rejoindre
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2D2416] text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2">
              <span className="font-fredoka text-2xl font-bold bg-gradient-to-r from-[#E07A5F] to-[#D4AF37] bg-clip-text text-transparent">
                Crochetti
              </span>
              <p className="text-white/60 mt-4 max-w-xs leading-relaxed">
                La communauté premium dédiée à l'excellence du crochet artisanal.
              </p>
              <div className="flex items-center gap-4 mt-6">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#E07A5F] transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#E07A5F] transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#E07A5F] transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold text-[#D4AF37] mb-4">Explorer</h4>
              <ul className="space-y-2">
                <li><button onClick={() => onNavigate('explorer')} className="text-white/60 hover:text-white transition-colors">Projets</button></li>
                <li><button onClick={() => onNavigate('creators')} className="text-white/60 hover:text-white transition-colors">Créateurs</button></li>
                <li><button onClick={() => onNavigate('boutique')} className="text-white/60 hover:text-white transition-colors">Boutique</button></li>
                <li><button onClick={() => onNavigate('boutique')} className="text-white/60 hover:text-white transition-colors">Patrons</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-[#D4AF37] mb-4">Ressources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/60 hover:text-white transition-colors">Centre d'aide</a></li>
                <li><a href="#" className="text-white/60 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-white/60 hover:text-white transition-colors">Guides</a></li>
                <li><a href="#" className="text-white/60 hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-[#D4AF37] mb-4">Légal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/60 hover:text-white transition-colors">Conditions</a></li>
                <li><a href="#" className="text-white/60 hover:text-white transition-colors">Confidentialité</a></li>
                <li><a href="#" className="text-white/60 hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              © 2024 Crochetti. Tous droits réservés.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-white/40 text-sm">Paiement sécurisé:</span>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 bg-white/10 rounded text-xs">Orange Money</div>
                <div className="px-3 py-1 bg-white/10 rounded text-xs">Wave</div>
                <div className="px-3 py-1 bg-white/10 rounded text-xs">Stripe</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// ============================================
// SIDEBAR COMPONENT
// ============================================

function Sidebar({ 
  currentView, 
  onNavigate, 
  isOpen, 
  onClose 
}: { 
  currentView: ViewType
  onNavigate: (view: ViewType) => void
  isOpen: boolean
  onClose: () => void
}) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />}
      
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-[280px] 
        bg-[#1A1410] text-[#F5F0E8]
        transform transition-transform duration-300 lg:transform-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col
        border-r border-[rgba(212,175,55,0.2)]
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-[rgba(212,175,55,0.2)] flex items-center justify-between">
          <span 
            className="font-fredoka text-2xl font-bold cursor-pointer text-gold-gradient hover:opacity-80 transition-opacity" 
            onClick={() => { onNavigate('landing'); onClose(); }}
          >
            Crochetti
          </span>
          <Button variant="ghost" size="icon" className="lg:hidden text-[#D4AF37] hover:bg-[rgba(212,175,55,0.1)]" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-4 py-6">
          <nav className="space-y-1">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => { onNavigate(item.view); onClose(); }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${currentView === item.view && item.view !== 'dashboard'
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#F4E5C2] text-[#1A1410] font-semibold shadow-lg shadow-[rgba(212,175,55,0.3)]' 
                    : 'text-[#B8A88A] hover:bg-[rgba(212,175,55,0.1)] hover:text-[#F5F0E8]'
                  }
                `}
              >
                <item.icon className="w-5 h-5" />
                <span className="flex-1 text-left text-sm">{item.label}</span>
                {item.badge && (
                  <span className="bg-[#C96850] text-white text-xs px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </ScrollArea>

        {/* User Profile */}
        <div className="p-4 border-t border-[rgba(212,175,55,0.2)]">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[rgba(212,175,55,0.1)] hover:bg-[rgba(212,175,55,0.15)] transition-colors cursor-pointer border border-[rgba(212,175,55,0.2)]" onClick={() => { onNavigate('profile'); onClose(); }}>
            <Avatar className="w-10 h-10 border-2 border-[#D4AF37]">
              <AvatarImage src="/images/creators/creator1.png" alt="User" />
              <AvatarFallback className="bg-[#81B29A] text-white">ML</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm text-[#F5F0E8] truncate">Marie Laurent</p>
              <Badge className="bg-[rgba(212,175,55,0.2)] text-[#D4AF37] text-[10px] px-2 py-0 border border-[rgba(212,175,55,0.3)]">
                <Crown className="w-3 h-3 mr-1" /> Créateur Pro
              </Badge>
            </div>
          </div>
          <button className="w-full flex items-center gap-3 px-4 py-3 mt-2 text-[#B8A88A] hover:text-[#D4AF37] transition-colors rounded-xl hover:bg-[rgba(212,175,55,0.1)]">
            <LogOut className="w-5 h-5" />
            <span className="text-sm">Déconnexion</span>
          </button>
        </div>
      </aside>
    </>
  )
}

// ============================================
// SUPERADMIN SIDEBAR COMPONENT
// ============================================

function SuperAdminSidebar({ 
  currentView, 
  onNavigate, 
  isOpen, 
  onClose 
}: { 
  currentView: ViewType
  onNavigate: (view: ViewType) => void
  isOpen: boolean
  onClose: () => void
}) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />}
      
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-[280px] 
        bg-gradient-to-b from-[#0D0A08] to-[#1A1410] text-[#F5F0E8]
        transform transition-transform duration-300 lg:transform-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col
        border-r border-[rgba(212,175,55,0.15)]
      `}>
        {/* Logo with Shield */}
        <div className="p-6 border-b border-[rgba(212,175,55,0.15)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#8B6914] flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#0D0A08]" />
            </div>
            <div>
              <span className="font-fredoka text-lg font-bold text-gold-gradient">Crochetti</span>
              <p className="text-[10px] text-[#D4AF37] -mt-1">SuperAdmin</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="lg:hidden text-[#D4AF37] hover:bg-[rgba(212,175,55,0.1)]" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="p-4 border-b border-[rgba(212,175,55,0.1)]">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[rgba(212,175,55,0.1)] rounded-lg p-2 text-center border border-[rgba(212,175,55,0.2)]">
              <p className="text-lg font-bold text-[#D4AF37]">{platformStats.newUsersToday}</p>
              <p className="text-[10px] text-[#B8A88A]">Nouveaux</p>
            </div>
            <div className="bg-[rgba(201,104,80,0.1)] rounded-lg p-2 text-center border border-[rgba(201,104,80,0.2)]">
              <p className="text-lg font-bold text-[#C96850]">{platformStats.pendingReports}</p>
              <p className="text-[10px] text-[#B8A88A]">Alertes</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3 py-4">
          <div className="mb-4">
            <p className="text-[10px] text-[#B8A88A] uppercase tracking-wider px-3 mb-2">Principal</p>
            <nav className="space-y-1">
              <button
                onClick={() => { 
                  window.location.href = '/superadmin';
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                  ${currentView === 'superadmin'
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8962F] text-[#0D0A08] font-semibold' 
                    : 'text-[#B8A88A] hover:bg-[rgba(212,175,55,0.1)] hover:text-[#F5F0E8]'
                  }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="text-sm">Dashboard</span>
              </button>
              <button
                onClick={() => { onNavigate('admin-users'); onClose(); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                  ${currentView === 'admin-users'
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8962F] text-[#0D0A08] font-semibold' 
                    : 'text-[#B8A88A] hover:bg-[rgba(212,175,55,0.1)] hover:text-[#F5F0E8]'
                  }`}
              >
                <Users className="w-4 h-4" />
                <span className="text-sm">Utilisateurs</span>
              </button>
              <button
                onClick={() => { onNavigate('admin-content'); onClose(); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                  ${currentView === 'admin-content'
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8962F] text-[#0D0A08] font-semibold' 
                    : 'text-[#B8A88A] hover:bg-[rgba(212,175,55,0.1)] hover:text-[#F5F0E8]'
                  }`}
              >
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm">Modération</span>
                <span className="ml-auto bg-[#C96850] text-white text-xs px-1.5 py-0.5 rounded-full">{platformStats.pendingReports}</span>
              </button>
            </nav>
          </div>

          <div className="mb-4">
            <p className="text-[10px] text-[#B8A88A] uppercase tracking-wider px-3 mb-2">Analytics</p>
            <nav className="space-y-1">
              <button
                onClick={() => { onNavigate('admin-analytics'); onClose(); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                  ${currentView === 'admin-analytics'
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8962F] text-[#0D0A08] font-semibold' 
                    : 'text-[#B8A88A] hover:bg-[rgba(212,175,55,0.1)] hover:text-[#F5F0E8]'
                  }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span className="text-sm">Statistiques</span>
              </button>
              <button
                onClick={() => { onNavigate('admin-revenue'); onClose(); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                  ${currentView === 'admin-revenue'
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8962F] text-[#0D0A08] font-semibold' 
                    : 'text-[#B8A88A] hover:bg-[rgba(212,175,55,0.1)] hover:text-[#F5F0E8]'
                  }`}
              >
                <DollarSign className="w-4 h-4" />
                <span className="text-sm">Revenus</span>
              </button>
            </nav>
          </div>

          <div className="mb-4">
            <p className="text-[10px] text-[#B8A88A] uppercase tracking-wider px-3 mb-2">Système</p>
            <nav className="space-y-1">
              <button
                onClick={() => { onNavigate('admin-settings'); onClose(); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                  ${currentView === 'admin-settings'
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8962F] text-[#0D0A08] font-semibold' 
                    : 'text-[#B8A88A] hover:bg-[rgba(212,175,55,0.1)] hover:text-[#F5F0E8]'
                  }`}
              >
                <Settings className="w-4 h-4" />
                <span className="text-sm">Paramètres</span>
              </button>
            </nav>
          </div>
        </ScrollArea>

        {/* Quick Actions */}
        <div className="p-4 border-t border-[rgba(212,175,55,0.15)]">
          <Button 
            onClick={() => { onNavigate('landing'); onClose(); }}
            variant="outline" 
            className="w-full border-[rgba(212,175,55,0.3)] text-[#D4AF37] hover:bg-[rgba(212,175,55,0.1)] gap-2"
          >
            <Globe className="w-4 h-4" />
            Voir le site
          </Button>
          <Button 
            onClick={() => { onNavigate('dashboard'); onClose(); }}
            variant="ghost" 
            className="w-full mt-2 text-[#B8A88A] hover:text-[#F5F0E8] hover:bg-[rgba(212,175,55,0.1)] gap-2"
          >
            <Briefcase className="w-4 h-4" />
            Mode Créateur
          </Button>
        </div>

        {/* Admin Profile */}
        <div className="p-4 border-t border-[rgba(212,175,55,0.15)]">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-[rgba(212,175,55,0.1)] border border-[rgba(212,175,55,0.2)]">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8B6914] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#0D0A08]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm text-[#F5F0E8]">SuperAdmin</p>
              <p className="text-[10px] text-[#D4AF37]">Accès complet</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

// ============================================
// SUPERADMIN DASHBOARD PAGE
// ============================================

function SuperAdminDashboard({ onNavigate, onOpenSidebar }: { onNavigate: (view: ViewType) => void; onOpenSidebar: () => void }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const adminStats = [
    { label: 'Utilisateurs Totaux', value: platformStats.totalUsers.toLocaleString(), icon: Users, color: 'text-[#D4AF37]', bg: 'bg-[rgba(212,175,55,0.1)]', trend: '+12.5%' },
    { label: 'Créateurs Actifs', value: platformStats.totalCreators.toLocaleString(), icon: Crown, color: 'text-[#81B29A]', bg: 'bg-[rgba(129,178,154,0.1)]', trend: '+8.3%' },
    { label: 'Projets Publiés', value: platformStats.totalProjects.toLocaleString(), icon: FolderOpen, color: 'text-[#C96850]', bg: 'bg-[rgba(201,104,80,0.1)]', trend: '+15.2%' },
    { label: 'Revenus Totaux', value: `${(platformStats.totalRevenue / 1000).toFixed(0)}K€`, icon: DollarSign, color: 'text-[#E8947B]', bg: 'bg-[rgba(232,148,123,0.1)]', trend: '+23.5%' },
  ]

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#0D0A08]">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#0D0A08]/95 backdrop-blur-sm border-b border-[rgba(212,175,55,0.15)] px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden hover:bg-[rgba(212,175,55,0.1)]" onClick={onOpenSidebar}>
              <Menu className="w-5 h-5 text-[#F5F0E8]" />
            </Button>
            <div>
              <h1 className="font-fredoka text-xl lg:text-2xl font-bold text-[#F5F0E8]">Dashboard Admin</h1>
              <p className="text-xs text-[#B8A88A] hidden sm:block">Vue d'ensemble de la plateforme Crochetti</p>
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-4">
            <div className="hidden md:flex relative max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B8A88A]" />
              <Input placeholder="Rechercher..." className="pl-10 bg-[#1A1410] border-[rgba(212,175,55,0.2)] text-[#F5F0E8] rounded-full w-64 placeholder:text-[#B8A88A]/60" />
            </div>
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="relative hover:bg-[rgba(212,175,55,0.1)]" onClick={() => onNavigate('admin-content')}>
              <Bell className="w-5 h-5 text-[#B8A88A]" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#C96850] rounded-full text-[10px] text-white flex items-center justify-center">{platformStats.pendingReports}</span>
            </Button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8B6914] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#0D0A08]" />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 lg:p-8 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats Cards */}
          <section className="animate-fade-in">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {adminStats.map((stat, index) => (
                <Card key={index} className="bg-[#1A1410] border border-[rgba(212,175,55,0.2)] hover:border-[rgba(212,175,55,0.4)] transition-all duration-300">
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-[#B8A88A] text-xs uppercase tracking-wider mb-1">{stat.label}</p>
                        <p className={`text-2xl lg:text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                        <div className="flex items-center gap-1 text-xs mt-1 text-[#81B29A]">
                          <TrendingUp className="w-3 h-3" />
                          {stat.trend}
                        </div>
                      </div>
                      <div className={`${stat.bg} p-2.5 rounded-lg`}>
                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Recent Activity */}
              <Card className="bg-[#1A1410] border border-[rgba(212,175,55,0.2)]">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-[#F5F0E8] font-fredoka flex items-center gap-2">
                      <Activity className="w-5 h-5 text-[#D4AF37]" /> Activité Récente
                    </CardTitle>
                    <Button variant="ghost" size="sm" className="text-[#D4AF37] hover:bg-[rgba(212,175,55,0.1)]">Voir tout</Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {notifications.slice(0, 5).map((notif) => (
                    <div key={notif.id} className="flex items-start gap-3 p-3 rounded-lg bg-[#0D0A08] border border-[rgba(212,175,55,0.1)]">
                      <div className="mt-0.5">{notif.icon}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[#F5F0E8] font-medium">{notif.title}</p>
                        <p className="text-xs text-[#B8A88A] truncate">{notif.message}</p>
                      </div>
                      <span className="text-xs text-[#B8A88A]/60">{notif.time}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Platform Growth Chart */}
              <Card className="bg-[#1A1410] border border-[rgba(212,175,55,0.2)]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[#F5F0E8] font-fredoka flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#81B29A]" /> Croissance Plateforme
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 flex items-end gap-2">
                    {revenueData.map((data, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <div 
                          className="w-full bg-gradient-to-t from-[#D4AF37] to-[#F4E5C2] rounded-t transition-all duration-300 hover:from-[#81B29A] hover:to-[#B8D4BE]"
                          style={{ height: `${(data.revenue / 35000) * 100}%` }}
                        />
                        <span className="text-[10px] text-[#B8A88A]">{data.month}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Pending Reports */}
              <Card className="bg-[#1A1410] border border-[rgba(201,104,80,0.3)]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[#F5F0E8] font-fredoka flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-[#C96850]" /> Signalements en Attente
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {reportedContent.filter(r => r.status === 'pending').slice(0, 3).map((report) => (
                    <div key={report.id} className="p-3 rounded-lg bg-[#0D0A08] border border-[rgba(201,104,80,0.2)]">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className={`${report.severity === 'high' ? 'bg-[#C96850]' : report.severity === 'medium' ? 'bg-[#D4AF37]' : 'bg-[#81B29A]'} text-[10px] text-[#0D0A08]`}>
                          {report.severity === 'high' ? 'Urgent' : report.severity === 'medium' ? 'Moyen' : 'Faible'}
                        </Badge>
                        <span className="text-xs text-[#B8A88A]">{report.type}</span>
                      </div>
                      <p className="text-sm text-[#F5F0E8] truncate">{report.content}</p>
                      <p className="text-xs text-[#B8A88A] mt-1">Par {report.reportedBy} • {report.reportedAt}</p>
                    </div>
                  ))}
                  <Button 
                    onClick={() => onNavigate('admin-content')}
                    className="w-full bg-[#C96850] hover:bg-[#A85A43] text-white"
                  >
                    Voir tous les signalements
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-[#1A1410] border border-[rgba(212,175,55,0.2)]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[#F5F0E8] font-fredoka flex items-center gap-2">
                    <Zap className="w-5 h-5 text-[#D4AF37]" /> Actions Rapides
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="border-[rgba(212,175,55,0.3)] text-[#D4AF37] hover:bg-[rgba(212,175,55,0.1)] flex-col h-auto py-4" onClick={() => onNavigate('admin-users')}>
                    <UserPlus className="w-5 h-5 mb-1" />
                    <span className="text-xs">Gérer Users</span>
                  </Button>
                  <Button variant="outline" className="border-[rgba(201,104,80,0.3)] text-[#C96850] hover:bg-[rgba(201,104,80,0.1)] flex-col h-auto py-4" onClick={() => onNavigate('admin-content')}>
                    <AlertTriangle className="w-5 h-5 mb-1" />
                    <span className="text-xs">Modérer</span>
                  </Button>
                  <Button variant="outline" className="border-[rgba(129,178,154,0.3)] text-[#81B29A] hover:bg-[rgba(129,178,154,0.1)] flex-col h-auto py-4" onClick={() => onNavigate('admin-analytics')}>
                    <BarChart3 className="w-5 h-5 mb-1" />
                    <span className="text-xs">Analytics</span>
                  </Button>
                  <Button variant="outline" className="border-[rgba(212,175,55,0.3)] text-[#D4AF37] hover:bg-[rgba(212,175,55,0.1)] flex-col h-auto py-4" onClick={() => onNavigate('admin-settings')}>
                    <Settings className="w-5 h-5 mb-1" />
                    <span className="text-xs">Paramètres</span>
                  </Button>
                </CardContent>
              </Card>

              {/* System Status */}
              <Card className="bg-[#1A1410] border border-[rgba(129,178,154,0.3)]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[#F5F0E8] font-fredoka flex items-center gap-2">
                    <Server className="w-5 h-5 text-[#81B29A]" /> État du Système
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#B8A88A]">Serveur API</span>
                    <Badge className="bg-[#81B29A]/20 text-[#81B29A] border border-[#81B29A]/30">Opérationnel</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#B8A88A]">Base de données</span>
                    <Badge className="bg-[#81B29A]/20 text-[#81B29A] border border-[#81B29A]/30">Opérationnel</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#B8A88A]">CDN Images</span>
                    <Badge className="bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30">Maintenance</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#B8A88A]">Paiements</span>
                    <Badge className="bg-[#81B29A]/20 text-[#81B29A] border border-[#81B29A]/30">Opérationnel</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

// ============================================
// ADMIN USERS PAGE
// ============================================

function AdminUsersPage({ onNavigate, onOpenSidebar }: { onNavigate: (view: ViewType) => void; onOpenSidebar: () => void }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [users, setUsers] = useState(platformUsers)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<PlatformUser | null>(null)
  const [confirmAction, setConfirmAction] = useState<{ type: 'suspend' | 'activate' | 'delete'; userId: number } | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null)

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type })
  }

  const handleAddUser = (userData: { name: string; email: string; role: 'admin' | 'creator' | 'user' }) => {
    const newUser: PlatformUser = {
      id: Math.max(...users.map(u => u.id)) + 1,
      name: userData.name,
      email: userData.email,
      avatar: '/images/creators/creator1.png',
      role: userData.role,
      status: 'pending',
      joinedAt: new Date().toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' }),
      lastActive: 'À l\'instant',
      projects: 0,
      followers: 0,
      revenue: 0,
      location: 'Non renseigné',
      verified: false
    }
    setUsers(prev => [newUser, ...prev])
    showToast(`${userData.name} a été ajouté comme ${userData.role === 'admin' ? 'administrateur' : userData.role === 'creator' ? 'créateur' : 'utilisateur'}`, 'success')
  }

  const handleViewUser = (user: PlatformUser) => {
    setSelectedUser(user)
    setShowUserModal(true)
  }

  const handleSuspendUser = (userId: number) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: 'suspended' as const } : u))
    const user = users.find(u => u.id === userId)
    showToast(`${user?.name} a été suspendu`, 'error')
  }

  const handleActivateUser = (userId: number) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: 'active' as const } : u))
    const user = users.find(u => u.id === userId)
    showToast(`${user?.name} a été activé`, 'success')
  }

  const handleDeleteUser = (userId: number) => {
    setUsers(prev => prev.filter(u => u.id !== userId))
    const user = users.find(u => u.id === userId)
    showToast(`${user?.name} a été supprimé`, 'error')
  }

  const openConfirmModal = (type: 'suspend' | 'activate' | 'delete', userId: number) => {
    setConfirmAction({ type, userId })
    setShowConfirmModal(true)
  }

  const executeConfirmAction = () => {
    if (!confirmAction) return
    if (confirmAction.type === 'suspend') handleSuspendUser(confirmAction.userId)
    else if (confirmAction.type === 'activate') handleActivateUser(confirmAction.userId)
    else if (confirmAction.type === 'delete') handleDeleteUser(confirmAction.userId)
    setConfirmAction(null)
  }

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'superadmin': return <Badge className="bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30"><Shield className="w-3 h-3 mr-1" />SuperAdmin</Badge>
      case 'admin': return <Badge className="bg-[#81B29A]/20 text-[#81B29A] border border-[#81B29A]/30"><ShieldCheck className="w-3 h-3 mr-1" />Admin</Badge>
      case 'creator': return <Badge className="bg-[#C96850]/20 text-[#C96850] border border-[#C96850]/30"><Crown className="w-3 h-3 mr-1" />Créateur</Badge>
      default: return <Badge className="bg-[#B8A88A]/20 text-[#B8A88A] border border-[#B8A88A]/30">Utilisateur</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <Badge className="bg-[#81B29A]/20 text-[#81B29A] border border-[#81B29A]/30">Actif</Badge>
      case 'suspended': return <Badge className="bg-[#C96850]/20 text-[#C96850] border border-[#C96850]/30">Suspendu</Badge>
      case 'pending': return <Badge className="bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30">En attente</Badge>
      default: return null
    }
  }

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#0D0A08]">
      {/* Toast Notification */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      {/* Add Admin Modal */}
      <AddAdminModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} onAdd={handleAddUser} />
      
      {/* User Detail Modal */}
      <UserDetailModal 
        isOpen={showUserModal} 
        onClose={() => { setShowUserModal(false); setSelectedUser(null) }} 
        user={selectedUser}
        onSuspend={() => { if (selectedUser) handleSuspendUser(selectedUser.id) }}
        onActivate={() => { if (selectedUser) handleActivateUser(selectedUser.id) }}
      />
      
      {/* Confirm Modal */}
      <ConfirmModal 
        isOpen={showConfirmModal} 
        onClose={() => { setShowConfirmModal(false); setConfirmAction(null) }}
        onConfirm={executeConfirmAction}
        title={confirmAction?.type === 'delete' ? 'Supprimer l\'utilisateur' : confirmAction?.type === 'suspend' ? 'Suspendre l\'utilisateur' : 'Activer l\'utilisateur'}
        message={confirmAction?.type === 'delete' ? 'Cette action est irréversible. L\'utilisateur sera définitivement supprimé.' : confirmAction?.type === 'suspend' ? 'L\'utilisateur ne pourra plus accéder à son compte.' : 'L\'utilisateur pourra à nouveau accéder à son compte.'}
        confirmText={confirmAction?.type === 'delete' ? 'Supprimer' : confirmAction?.type === 'suspend' ? 'Suspendre' : 'Activer'}
        variant={confirmAction?.type === 'delete' ? 'danger' : confirmAction?.type === 'suspend' ? 'warning' : 'info'}
      />

      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#0D0A08]/95 backdrop-blur-sm border-b border-[rgba(212,175,55,0.15)] px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden hover:bg-[rgba(212,175,55,0.1)]" onClick={onOpenSidebar}>
              <Menu className="w-5 h-5 text-[#F5F0E8]" />
            </Button>
            <div>
              <h1 className="font-fredoka text-xl lg:text-2xl font-bold text-[#F5F0E8]">Gestion Utilisateurs</h1>
              <p className="text-xs text-[#B8A88A] hidden sm:block">{users.length} utilisateurs sur la plateforme</p>
            </div>
          </div>
          <Button onClick={() => setShowAddModal(true)} className="bg-[#D4AF37] hover:bg-[#B8962F] text-[#0D0A08]">
            <UserPlus className="w-4 h-4 mr-2" /> Ajouter Admin
          </Button>
        </div>
      </header>

      <main className="flex-1 p-4 lg:p-8 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B8A88A]" />
              <Input 
                placeholder="Rechercher un utilisateur..." 
                className="pl-10 bg-[#1A1410] border-[rgba(212,175,55,0.2)] text-[#F5F0E8] rounded-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select 
                className="bg-[#1A1410] border border-[rgba(212,175,55,0.2)] text-[#F5F0E8] rounded-lg px-4 py-2"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="all">Tous les rôles</option>
                <option value="superadmin">SuperAdmin</option>
                <option value="admin">Admin</option>
                <option value="creator">Créateur</option>
                <option value="user">Utilisateur</option>
              </select>
              <select 
                className="bg-[#1A1410] border border-[rgba(212,175,55,0.2)] text-[#F5F0E8] rounded-lg px-4 py-2"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Tous les statuts</option>
                <option value="active">Actif</option>
                <option value="suspended">Suspendu</option>
                <option value="pending">En attente</option>
              </select>
            </div>
          </div>

          {/* Users Table */}
          <Card className="bg-[#1A1410] border border-[rgba(212,175,55,0.2)]">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[rgba(212,175,55,0.2)]">
                      <th className="text-left text-xs font-medium text-[#B8A88A] uppercase tracking-wider px-6 py-4">Utilisateur</th>
                      <th className="text-left text-xs font-medium text-[#B8A88A] uppercase tracking-wider px-6 py-4">Rôle</th>
                      <th className="text-left text-xs font-medium text-[#B8A88A] uppercase tracking-wider px-6 py-4">Statut</th>
                      <th className="text-left text-xs font-medium text-[#B8A88A] uppercase tracking-wider px-6 py-4">Projets</th>
                      <th className="text-left text-xs font-medium text-[#B8A88A] uppercase tracking-wider px-6 py-4">Revenus</th>
                      <th className="text-left text-xs font-medium text-[#B8A88A] uppercase tracking-wider px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[rgba(212,175,55,0.1)]">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-[#0D0A08] transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10 border border-[rgba(212,175,55,0.3)]">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback className="bg-[#2D2416] text-[#D4AF37]">{user.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="text-[#F5F0E8] font-medium">{user.name}</p>
                                {user.verified && <CheckCircle className="w-4 h-4 text-[#D4AF37]" />}
                              </div>
                              <p className="text-xs text-[#B8A88A]">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">{getRoleBadge(user.role)}</td>
                        <td className="px-6 py-4">{getStatusBadge(user.status)}</td>
                        <td className="px-6 py-4 text-[#F5F0E8]">{user.projects}</td>
                        <td className="px-6 py-4 text-[#D4AF37]">{user.revenue > 0 ? `${user.revenue.toFixed(2)}€` : '-'}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 hover:bg-[rgba(212,175,55,0.1)]"
                              onClick={() => handleViewUser(user)}
                              title="Voir le profil"
                            >
                              <Eye className="w-4 h-4 text-[#B8A88A]" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 hover:bg-[rgba(212,175,55,0.1)]"
                              onClick={() => showToast(`Modification de ${user.name}`, 'info')}
                              title="Modifier"
                            >
                              <Edit className="w-4 h-4 text-[#B8A88A]" />
                            </Button>
                            {user.status === 'active' ? (
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 hover:bg-[rgba(201,104,80,0.1)]"
                                onClick={() => openConfirmModal('suspend', user.id)}
                                title="Suspendre"
                              >
                                <Ban className="w-4 h-4 text-[#C96850]" />
                              </Button>
                            ) : (
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 hover:bg-[rgba(129,178,154,0.1)]"
                                onClick={() => openConfirmModal('activate', user.id)}
                                title="Activer"
                              >
                                <UserCheck className="w-4 h-4 text-[#81B29A]" />
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

// ============================================
// ADMIN CONTENT MODERATION PAGE
// ============================================

function AdminContentPage({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  const [filter, setFilter] = useState<'pending' | 'reviewed' | 'all'>('pending')
  const [reports, setReports] = useState(reportedContent)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null)

  const filteredReports = reports.filter(r => filter === 'all' || r.status === filter)

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type })
  }

  const handleDeleteContent = (reportId: number) => {
    setReports(prev => prev.map(r => r.id === reportId ? { ...r, status: 'resolved' as const } : r))
    showToast('Contenu supprimé avec succès', 'success')
  }

  const handleDismissReport = (reportId: number) => {
    setReports(prev => prev.map(r => r.id === reportId ? { ...r, status: 'dismissed' as const } : r))
    showToast('Signalement ignoré', 'info')
  }

  const handleViewContent = (report: typeof reportedContent[0]) => {
    showToast(`Visualisation du contenu: ${report.type}`, 'info')
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high': return <Badge className="bg-[#C96850] text-white">Urgent</Badge>
      case 'medium': return <Badge className="bg-[#D4AF37] text-[#0D0A08]">Moyen</Badge>
      default: return <Badge className="bg-[#81B29A] text-white">Faible</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'project': return <FolderOpen className="w-4 h-4" />
      case 'comment': return <MessageCircle className="w-4 h-4" />
      case 'user': return <User className="w-4 h-4" />
      case 'message': return <Mail className="w-4 h-4" />
      default: return <AlertCircle className="w-4 h-4" />
    }
  }

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#0D0A08]">
      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#0D0A08]/95 backdrop-blur-sm border-b border-[rgba(212,175,55,0.15)] px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden hover:bg-[rgba(212,175,55,0.1)]" onClick={onOpenSidebar}>
              <Menu className="w-5 h-5 text-[#F5F0E8]" />
            </Button>
            <div>
              <h1 className="font-fredoka text-xl lg:text-2xl font-bold text-[#F5F0E8]">Modération du Contenu</h1>
              <p className="text-xs text-[#B8A88A] hidden sm:block">Gérez les signalements et modérez le contenu</p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 lg:p-8 overflow-auto">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="bg-[#1A1410] border border-[rgba(201,104,80,0.3)]">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-[#C96850]">{reports.filter(r => r.status === 'pending').length}</p>
                <p className="text-xs text-[#B8A88A]">En attente</p>
              </CardContent>
            </Card>
            <Card className="bg-[#1A1410] border border-[rgba(212,175,55,0.3)]">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-[#D4AF37]">{reports.filter(r => r.status === 'reviewed').length}</p>
                <p className="text-xs text-[#B8A88A]">En révision</p>
              </CardContent>
            </Card>
            <Card className="bg-[#1A1410] border border-[rgba(129,178,154,0.3)]">
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-[#81B29A]">{reports.filter(r => r.status === 'resolved').length}</p>
                <p className="text-xs text-[#B8A88A]">Résolus</p>
              </CardContent>
            </Card>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2">
            {(['pending', 'reviewed', 'all'] as const).map((f) => (
              <Button 
                key={f}
                variant={filter === f ? 'default' : 'outline'}
                className={filter === f 
                  ? 'bg-[#D4AF37] text-[#0D0A08]' 
                  : 'border-[rgba(212,175,55,0.3)] text-[#D4AF37] hover:bg-[rgba(212,175,55,0.1)]'
                }
                onClick={() => setFilter(f)}
              >
                {f === 'pending' ? 'En attente' : f === 'reviewed' ? 'En révision' : 'Tous'}
              </Button>
            ))}
          </div>

          {/* Reports List */}
          <div className="space-y-4">
            {filteredReports.map((report) => (
              <Card key={report.id} className="bg-[#1A1410] border border-[rgba(212,175,55,0.2)]">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${report.severity === 'high' ? 'bg-[#C96850]/20' : report.severity === 'medium' ? 'bg-[#D4AF37]/20' : 'bg-[#81B29A]/20'}`}>
                      <AlertTriangle className={`w-6 h-6 ${report.severity === 'high' ? 'text-[#C96850]' : report.severity === 'medium' ? 'text-[#D4AF37]' : 'text-[#81B29A]'}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-2 text-[#B8A88A]">
                          {getTypeIcon(report.type)}
                          <span className="text-sm capitalize">{report.type}</span>
                        </div>
                        {getSeverityBadge(report.severity)}
                        <span className="text-xs text-[#B8A88A]">{report.reportedAt}</span>
                      </div>
                      <p className="text-[#F5F0E8] mb-2">{report.content}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-[#B8A88A]">Signalé par: <span className="text-[#F5F0E8]">{report.reportedBy}</span></span>
                        <span className="text-[#B8A88A]">Utilisateur: <span className="text-[#C96850]">{report.reportedUser}</span></span>
                      </div>
                      <div className="mt-2 p-2 bg-[#0D0A08] rounded-lg">
                        <span className="text-xs text-[#B8A88A]">Raison: </span>
                        <span className="text-xs text-[#F5F0E8]">{report.reason}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button 
                        size="sm" 
                        className="bg-[#C96850] hover:bg-[#A85A43] text-white"
                        onClick={() => handleDeleteContent(report.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-1" /> Supprimer
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-[rgba(212,175,55,0.3)] text-[#D4AF37] hover:bg-[rgba(212,175,55,0.1)]"
                        onClick={() => handleDismissReport(report.id)}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" /> Ignorer
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-[rgba(129,178,154,0.3)] text-[#81B29A] hover:bg-[rgba(129,178,154,0.1)]"
                        onClick={() => handleViewContent(report)}
                      >
                        <Eye className="w-4 h-4 mr-1" /> Voir
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

// ============================================
// ADMIN ANALYTICS PAGE
// ============================================

function AdminAnalyticsPage({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#0D0A08]">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#0D0A08]/95 backdrop-blur-sm border-b border-[rgba(212,175,55,0.15)] px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden hover:bg-[rgba(212,175,55,0.1)]" onClick={onOpenSidebar}>
              <Menu className="w-5 h-5 text-[#F5F0E8]" />
            </Button>
            <div>
              <h1 className="font-fredoka text-xl lg:text-2xl font-bold text-[#F5F0E8]">Analytics Plateforme</h1>
              <p className="text-xs text-[#B8A88A] hidden sm:block">Statistiques détaillées de la plateforme</p>
            </div>
          </div>
          <Button variant="outline" className="border-[rgba(212,175,55,0.3)] text-[#D4AF37] hover:bg-[rgba(212,175,55,0.1)]">
            <Download className="w-4 h-4 mr-2" /> Exporter
          </Button>
        </div>
      </header>

      <main className="flex-1 p-4 lg:p-8 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Utilisateurs Actifs', value: '12,847', icon: Users, color: '#D4AF37', change: '+12%' },
              { label: 'Sessions/Jour', value: '45,231', icon: Activity, color: '#81B29A', change: '+8%' },
              { label: 'Temps Moyen', value: '12:45', icon: Clock, color: '#C96850', change: '+5%' },
              { label: 'Taux Conversion', value: '3.2%', icon: Target, color: '#E8947B', change: '+15%' },
            ].map((kpi, i) => (
              <Card key={i} className="bg-[#1A1410] border border-[rgba(212,175,55,0.2)]">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: `${kpi.color}20` }}>
                      <kpi.icon className="w-5 h-5" style={{ color: kpi.color }} />
                    </div>
                    <span className="text-xs text-[#81B29A]">{kpi.change}</span>
                  </div>
                  <p className="text-2xl font-bold text-[#F5F0E8]">{kpi.value}</p>
                  <p className="text-xs text-[#B8A88A]">{kpi.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-[#1A1410] border border-[rgba(212,175,55,0.2)]">
              <CardHeader>
                <CardTitle className="text-[#F5F0E8] font-fredoka">Croissance Utilisateurs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end gap-2">
                  {revenueData.map((data, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div 
                        className="w-full bg-gradient-to-t from-[#D4AF37] to-[#F4E5C2] rounded-t"
                        style={{ height: `${(data.subscriptions / 15000) * 100}%` }}
                      />
                      <span className="text-[10px] text-[#B8A88A]">{data.month}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1A1410] border border-[rgba(212,175,55,0.2)]">
              <CardHeader>
                <CardTitle className="text-[#F5F0E8] font-fredoka">Répartition par Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { label: 'Créateurs', value: 3421, percent: 75, color: '#D4AF37' },
                    { label: 'Utilisateurs', value: 42345, percent: 92, color: '#81B29A' },
                    { label: 'Admins', value: 126, percent: 3, color: '#C96850' },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-[#F5F0E8]">{item.label}</span>
                        <span className="text-[#B8A88A]">{item.value.toLocaleString()}</span>
                      </div>
                      <div className="h-2 bg-[#0D0A08] rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${item.percent}%`, backgroundColor: item.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Countries */}
          <Card className="bg-[#1A1410] border border-[rgba(212,175,55,0.2)]">
            <CardHeader>
              <CardTitle className="text-[#F5F0E8] font-fredoka">Top Pays</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { country: 'France', users: 28450, flag: '🇫🇷' },
                  { country: 'Sénégal', users: 8934, flag: '🇸🇳' },
                  { country: 'Belgique', users: 5621, flag: '🇧🇪' },
                  { country: 'Canada', users: 4532, flag: '🇨🇦' },
                  { country: 'Maroc', users: 3892, flag: '🇲🇦' },
                  { country: 'Suisse', users: 2845, flag: '🇨🇭' },
                  { country: 'Côte d\'Ivoire', users: 2134, flag: '🇨🇮' },
                  { country: 'Tunisie', users: 1876, flag: '🇹🇳' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-[#0D0A08] rounded-lg border border-[rgba(212,175,55,0.1)]">
                    <span className="text-2xl">{item.flag}</span>
                    <div>
                      <p className="text-[#F5F0E8] font-medium">{item.country}</p>
                      <p className="text-xs text-[#B8A88A]">{item.users.toLocaleString()} utilisateurs</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

// ============================================
// ADMIN REVENUE PAGE
// ============================================

function AdminRevenuePage({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#0D0A08]">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#0D0A08]/95 backdrop-blur-sm border-b border-[rgba(212,175,55,0.15)] px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden hover:bg-[rgba(212,175,55,0.1)]" onClick={onOpenSidebar}>
              <Menu className="w-5 h-5 text-[#F5F0E8]" />
            </Button>
            <div>
              <h1 className="font-fredoka text-xl lg:text-2xl font-bold text-[#F5F0E8]">Gestion Revenus</h1>
              <p className="text-xs text-[#B8A88A] hidden sm:block">Suivez les revenus et transactions de la plateforme</p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 lg:p-8 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Revenue Summary */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-[#D4AF37] to-[#8B6914] border-0">
              <CardContent className="p-4">
                <p className="text-sm text-[#0D0A08]/70">Revenu Total</p>
                <p className="text-3xl font-bold text-[#0D0A08]">234,567€</p>
                <p className="text-xs text-[#0D0A08]/60 mt-1">+23.5% ce mois</p>
              </CardContent>
            </Card>
            <Card className="bg-[#1A1410] border border-[rgba(212,175,55,0.2)]">
              <CardContent className="p-4">
                <p className="text-sm text-[#B8A88A]">Commissions</p>
                <p className="text-3xl font-bold text-[#D4AF37]">45,234€</p>
                <p className="text-xs text-[#81B29A] mt-1">+18% ce mois</p>
              </CardContent>
            </Card>
            <Card className="bg-[#1A1410] border border-[rgba(212,175,55,0.2)]">
              <CardContent className="p-4">
                <p className="text-sm text-[#B8A88A]">Abonnements</p>
                <p className="text-3xl font-bold text-[#81B29A]">62,500€</p>
                <p className="text-xs text-[#81B29A] mt-1">+12% ce mois</p>
              </CardContent>
            </Card>
            <Card className="bg-[#1A1410] border border-[rgba(212,175,55,0.2)]">
              <CardContent className="p-4">
                <p className="text-sm text-[#B8A88A]">En Attente</p>
                <p className="text-3xl font-bold text-[#C96850]">12,450€</p>
                <p className="text-xs text-[#B8A88A] mt-1">23 retraits</p>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Chart */}
          <Card className="bg-[#1A1410] border border-[rgba(212,175,55,0.2)]">
            <CardHeader>
              <CardTitle className="text-[#F5F0E8] font-fredoka">Évolution des Revenus</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end gap-3">
                {revenueData.map((data, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex flex-col gap-1">
                      <div 
                        className="w-full bg-[#D4AF37] rounded-t"
                        style={{ height: `${(data.subscriptions / 15000) * 80}px` }}
                      />
                      <div 
                        className="w-full bg-[#81B29A] rounded-t"
                        style={{ height: `${(data.commissions / 15000) * 80}px` }}
                      />
                    </div>
                    <span className="text-[10px] text-[#B8A88A]">{data.month}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-[#D4AF37]" />
                  <span className="text-xs text-[#B8A88A]">Abonnements</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-[#81B29A]" />
                  <span className="text-xs text-[#B8A88A]">Commissions</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card className="bg-[#1A1410] border border-[rgba(212,175,55,0.2)]">
            <CardHeader>
              <CardTitle className="text-[#F5F0E8] font-fredoka">Transactions Récentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { user: 'Marie Crochet', type: 'Retrait', amount: '-245.67€', status: 'pending', time: 'Il y a 2h' },
                { user: 'Sophie Artisan', type: 'Vente Patron', amount: '+12.99€', status: 'completed', time: 'Il y a 3h' },
                { user: 'Claire Design', type: 'Abonnement Pro', amount: '+29.99€', status: 'completed', time: 'Il y a 5h' },
                { user: 'Emma Bébé', type: 'Commission', amount: '-3.50€', status: 'completed', time: 'Il y a 6h' },
              ].map((tx, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-[#0D0A08] rounded-lg border border-[rgba(212,175,55,0.1)]">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${tx.type.includes('Retrait') ? 'bg-[#C96850]/20' : 'bg-[#81B29A]/20'}`}>
                      <DollarSign className={`w-4 h-4 ${tx.type.includes('Retrait') ? 'text-[#C96850]' : 'text-[#81B29A]'}`} />
                    </div>
                    <div>
                      <p className="text-[#F5F0E8] text-sm">{tx.user}</p>
                      <p className="text-xs text-[#B8A88A]">{tx.type} • {tx.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${tx.amount.startsWith('+') ? 'text-[#81B29A]' : 'text-[#C96850]'}`}>{tx.amount}</p>
                    <Badge className={tx.status === 'completed' ? 'bg-[#81B29A]/20 text-[#81B29A]' : 'bg-[#D4AF37]/20 text-[#D4AF37]'}>
                      {tx.status === 'completed' ? 'Complété' : 'En attente'}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

// ============================================
// ADMIN SETTINGS PAGE
// ============================================

function AdminSettingsPage({ onNavigate, onOpenSidebar }: { onNavigate: (view: ViewType) => void; onOpenSidebar: () => void }) {
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [registrationOpen, setRegistrationOpen] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null)

  const handleAddUser = (userData: { name: string; email: string; role: 'admin' | 'creator' | 'user' }) => {
    showToast(`${userData.name} a été ajouté comme ${userData.role === 'admin' ? 'administrateur' : userData.role === 'creator' ? 'créateur' : 'utilisateur'}`, 'success')
  }

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type })
  }

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#0D0A08]">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      {/* Add User Modal */}
      <AddAdminModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} onAdd={handleAddUser} />
      
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#0D0A08]/95 backdrop-blur-sm border-b border-[rgba(212,175,55,0.15)] px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden hover:bg-[rgba(212,175,55,0.1)]" onClick={onOpenSidebar}>
              <Menu className="w-5 h-5 text-[#F5F0E8]" />
            </Button>
            <div>
              <h1 className="font-fredoka text-xl lg:text-2xl font-bold text-[#F5F0E8]">Paramètres Système</h1>
              <p className="text-xs text-[#B8A88A] hidden sm:block">Configurez les paramètres de la plateforme</p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 lg:p-8 overflow-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* User Management */}
          <Card className="bg-[#1A1410] border border-[rgba(212,175,55,0.2)]">
            <CardHeader>
              <CardTitle className="text-[#F5F0E8] font-fredoka flex items-center gap-2">
                <Users className="w-5 h-5 text-[#D4AF37]" /> Gestion des Utilisateurs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <Button 
                  onClick={() => setShowAddModal(true)}
                  className="bg-[#D4AF37] hover:bg-[#B8962F] text-[#0D0A08] h-auto py-4 flex-col"
                >
                  <UserPlus className="w-5 h-5 mb-2" />
                  <span className="text-sm">Ajouter Admin</span>
                </Button>
                <Button 
                  onClick={() => setShowAddModal(true)}
                  variant="outline" 
                  className="border-[rgba(201,104,80,0.3)] text-[#C96850] hover:bg-[rgba(201,104,80,0.1)] h-auto py-4 flex-col"
                >
                  <Crown className="w-5 h-5 mb-2" />
                  <span className="text-sm">Ajouter Créateur</span>
                </Button>
                <Button 
                  onClick={() => onNavigate('admin-users')}
                  variant="outline" 
                  className="border-[rgba(129,178,154,0.3)] text-[#81B29A] hover:bg-[rgba(129,178,154,0.1)] h-auto py-4 flex-col"
                >
                  <Users className="w-5 h-5 mb-2" />
                  <span className="text-sm">Voir tous</span>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Platform Settings */}
          <Card className="bg-[#1A1410] border border-[rgba(212,175,55,0.2)]">
            <CardHeader>
              <CardTitle className="text-[#F5F0E8] font-fredoka flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#D4AF37]" /> Paramètres Généraux
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#F5F0E8] font-medium">Mode Maintenance</p>
                  <p className="text-xs text-[#B8A88A]">Désactive l'accès public à la plateforme</p>
                </div>
                <Switch checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
              </div>
              <Separator className="bg-[rgba(212,175,55,0.2)]" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#F5F0E8] font-medium">Inscriptions Ouvertes</p>
                  <p className="text-xs text-[#B8A88A]">Autoriser les nouvelles inscriptions</p>
                </div>
                <Switch checked={registrationOpen} onCheckedChange={setRegistrationOpen} />
              </div>
              <Separator className="bg-[rgba(212,175,55,0.2)]" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#F5F0E8] font-medium">Commission Plateforme</p>
                  <p className="text-xs text-[#B8A88A]">Pourcentage prélevé sur chaque vente</p>
                </div>
                <div className="flex items-center gap-2">
                  <Input className="w-20 bg-[#0D0A08] border-[rgba(212,175,55,0.2)] text-[#F5F0E8]" value="15%" />
                  <Button variant="outline" className="border-[rgba(212,175,55,0.3)] text-[#D4AF37]">Modifier</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="bg-[#1A1410] border border-[rgba(212,175,55,0.2)]">
            <CardHeader>
              <CardTitle className="text-[#F5F0E8] font-fredoka flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#D4AF37]" /> Sécurité
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="border-[rgba(201,104,80,0.3)] text-[#C96850] hover:bg-[rgba(201,104,80,0.1)] h-auto py-4 flex-col">
                  <Lock className="w-5 h-5 mb-2" />
                  <span className="text-sm">Réinitialiser MDP Admin</span>
                </Button>
                <Button variant="outline" className="border-[rgba(212,175,55,0.3)] text-[#D4AF37] hover:bg-[rgba(212,175,55,0.1)] h-auto py-4 flex-col">
                  <RefreshCw className="w-5 h-5 mb-2" />
                  <span className="text-sm">Régénérer clés API</span>
                </Button>
                <Button variant="outline" className="border-[rgba(129,178,154,0.3)] text-[#81B29A] hover:bg-[rgba(129,178,154,0.1)] h-auto py-4 flex-col">
                  <Database className="w-5 h-5 mb-2" />
                  <span className="text-sm">Backup Base de données</span>
                </Button>
                <Button variant="outline" className="border-[rgba(232,148,123,0.3)] text-[#E8947B] hover:bg-[rgba(232,148,123,0.1)] h-auto py-4 flex-col">
                  <Archive className="w-5 h-5 mb-2" />
                  <span className="text-sm">Exporter Logs</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="bg-[#1A1410] border border-[rgba(201,104,80,0.3)]">
            <CardHeader>
              <CardTitle className="text-[#C96850] font-fredoka flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" /> Zone de Danger
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#C96850]/10 rounded-lg border border-[rgba(201,104,80,0.2)]">
                <div>
                  <p className="text-[#F5F0E8] font-medium">Vider le Cache</p>
                  <p className="text-xs text-[#B8A88A]">Supprime tous les fichiers en cache</p>
                </div>
                <Button variant="destructive" className="bg-[#C96850] hover:bg-[#A85A43]">Vider</Button>
              </div>
              <div className="flex items-center justify-between p-4 bg-[#C96850]/10 rounded-lg border border-[rgba(201,104,80,0.2)]">
                <div>
                  <p className="text-[#F5F0E8] font-medium">Réinitialiser la Plateforme</p>
                  <p className="text-xs text-[#B8A88A]">⚠️ Cette action est irréversible</p>
                </div>
                <Button variant="destructive" className="bg-[#C96850] hover:bg-[#A85A43]">Réinitialiser</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

// ============================================
// PAGE COMPONENTS
// ============================================

// New Project Page
function NewProjectPage({ onNavigate, onOpenSidebar }: { onNavigate: (view: ViewType) => void; onOpenSidebar: () => void }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [materials, setMaterials] = useState('')
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null)

  const handleSubmit = () => {
    if (!title.trim() || !category) {
      setToast({ message: 'Veuillez remplir les champs obligatoires', type: 'error' })
      return
    }
    setToast({ message: 'Projet créé avec succès!', type: 'success' })
    setTimeout(() => onNavigate('dashboard'), 1500)
  }

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#FDFCF0] dark:bg-[#1A1410]">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#FDFCF0]/95 dark:bg-[#1A1410]/95 backdrop-blur-sm border-b border-[#E8E5D8] dark:border-[rgba(212,175,55,0.2)] px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="hover:bg-[rgba(212,175,55,0.1)]" onClick={() => onNavigate('dashboard')}>
              <ArrowLeft className="w-5 h-5 text-[#3D2914] dark:text-[#F5F0E8]" />
            </Button>
            <div>
              <h1 className="font-fredoka text-xl lg:text-2xl font-bold text-[#3D2914] dark:text-[#F5F0E8]">Nouveau Projet</h1>
              <p className="text-xs text-[#5C4330] dark:text-[#B8A88A] hidden sm:block">Créez et partagez votre nouveau projet</p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 lg:p-8 overflow-auto">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Project Image Upload */}
          <Card className="bg-white dark:bg-[#2D2416] border border-[#E8E5D8] dark:border-[rgba(212,175,55,0.2)]">
            <CardHeader>
              <CardTitle className="text-[#3D2914] dark:text-[#F5F0E8] font-fredoka flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-[#D4AF37]" /> Image du projet
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-[#E8E5D8] dark:border-[rgba(212,175,55,0.3)] rounded-xl p-8 text-center hover:border-[#D4AF37] transition-colors cursor-pointer">
                <Upload className="w-12 h-12 mx-auto text-[#B8A88A] mb-4" />
                <p className="text-[#5C4330] dark:text-[#B8A88A]">Glissez une image ici ou cliquez pour télécharger</p>
                <p className="text-xs text-[#B8A88A] mt-2">PNG, JPG jusqu'à 5MB</p>
              </div>
            </CardContent>
          </Card>

          {/* Project Details */}
          <Card className="bg-white dark:bg-[#2D2416] border border-[#E8E5D8] dark:border-[rgba(212,175,55,0.2)]">
            <CardHeader>
              <CardTitle className="text-[#3D2914] dark:text-[#F5F0E8] font-fredoka flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#D4AF37]" /> Détails du projet
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-[#5C4330] dark:text-[#B8A88A] mb-2 block">Titre *</Label>
                <Input 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Bonnet Ourson Amigurumi"
                  className="bg-[#FDFCF0] dark:bg-[#1A1410] border-[#E8E5D8] dark:border-[rgba(212,175,55,0.2)] text-[#3D2914] dark:text-[#F5F0E8]"
                />
              </div>
              
              <div>
                <Label className="text-[#5C4330] dark:text-[#B8A88A] mb-2 block">Description</Label>
                <Textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Décrivez votre projet..."
                  rows={4}
                  className="bg-[#FDFCF0] dark:bg-[#1A1410] border-[#E8E5D8] dark:border-[rgba(212,175,55,0.2)] text-[#3D2914] dark:text-[#F5F0E8] resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-[#5C4330] dark:text-[#B8A88A] mb-2 block">Catégorie *</Label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FDFCF0] dark:bg-[#1A1410] border border-[#E8E5D8] dark:border-[rgba(212,175,55,0.2)] rounded-lg text-[#3D2914] dark:text-[#F5F0E8]"
                  >
                    <option value="">Sélectionner</option>
                    <option value="amigurumi">Amigurumi</option>
                    <option value="vetements">Vêtements</option>
                    <option value="accessoires">Accessoires</option>
                    <option value="decoration">Décoration</option>
                    <option value="sacs">Sacs</option>
                    <option value="couvertures">Couvertures</option>
                  </select>
                </div>
                <div>
                  <Label className="text-[#5C4330] dark:text-[#B8A88A] mb-2 block">Difficulté</Label>
                  <select 
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FDFCF0] dark:bg-[#1A1410] border border-[#E8E5D8] dark:border-[rgba(212,175,55,0.2)] rounded-lg text-[#3D2914] dark:text-[#F5F0E8]"
                  >
                    <option value="">Sélectionner</option>
                    <option value="debutant">Débutant</option>
                    <option value="intermediaire">Intermédiaire</option>
                    <option value="avance">Avancé</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Materials */}
          <Card className="bg-white dark:bg-[#2D2416] border border-[#E8E5D8] dark:border-[rgba(212,175,55,0.2)]">
            <CardHeader>
              <CardTitle className="text-[#3D2914] dark:text-[#F5F0E8] font-fredoka flex items-center gap-2">
                <Package className="w-5 h-5 text-[#D4AF37]" /> Matériel nécessaire
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea 
                value={materials}
                onChange={(e) => setMaterials(e.target.value)}
                placeholder="Listez le matériel nécessaire (fil, crochet, etc.)..."
                rows={3}
                className="bg-[#FDFCF0] dark:bg-[#1A1410] border-[#E8E5D8] dark:border-[rgba(212,175,55,0.2)] text-[#3D2914] dark:text-[#F5F0E8] resize-none"
              />
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <Button 
              variant="outline" 
              onClick={() => onNavigate('dashboard')}
              className="border-[#E8E5D8] dark:border-[rgba(212,175,55,0.3)] text-[#5C4330] dark:text-[#B8A88A]"
            >
              Annuler
            </Button>
            <Button 
              onClick={handleSubmit}
              className="bg-[#D4AF37] hover:bg-[#B8962F] text-[#0D0A08]"
            >
              <Save className="w-4 h-4 mr-2" /> Créer le projet
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

// Dashboard Page
function DashboardPage({ onNavigate, onOpenSidebar }: { onNavigate: (view: ViewType) => void; onOpenSidebar: () => void }) {
  const [activeTab, setActiveTab] = useState('Tous')
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published': return <Badge className="bg-[#81B29A]/20 text-[#81B29A] text-xs border border-[#81B29A]/30">Publié</Badge>
      case 'draft': return <Badge className="bg-[#B8A88A]/20 text-[#B8A88A] text-xs border border-[#B8A88A]/30">Brouillon</Badge>
      case 'archived': return <Badge className="bg-[#E8947B]/20 text-[#E8947B] text-xs border border-[#E8947B]/30">Archivé</Badge>
      default: return null
    }
  }

  const filteredProjects = tableProjects.filter(project => {
    if (activeTab === 'Tous') return true
    if (activeTab === 'Publiés') return project.status === 'published'
    if (activeTab === 'Brouillons') return project.status === 'draft'
    if (activeTab === 'Archivés') return project.status === 'archived'
    return true
  })

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#FDFCF0] dark:bg-[#1A1410]">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#FDFCF0]/95 dark:bg-[#1A1410]/95 backdrop-blur-sm border-b border-[#E8E5D8] dark:border-[rgba(212,175,55,0.2)] px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden hover:bg-[rgba(212,175,55,0.1)]" onClick={onOpenSidebar}>
              <Menu className="w-5 h-5 text-[#3D2914] dark:text-[#F5F0E8]" />
            </Button>
            <div>
              <h1 className="font-fredoka text-xl lg:text-2xl font-bold text-[#3D2914] dark:text-[#F5F0E8]">Tableau de bord</h1>
              <p className="text-xs text-[#5C4330] dark:text-[#B8A88A] hidden sm:block">Bienvenue, Marie ! Voici vos statistiques.</p>
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-4">
            <div className="hidden md:flex relative max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5C4330] dark:text-[#B8A88A]" />
              <Input placeholder="Rechercher..." className="pl-10 bg-white dark:bg-[#2D2416] border-[#E8E5D8] dark:border-[rgba(212,175,55,0.2)] text-[#3D2914] dark:text-[#F5F0E8] rounded-full w-64 placeholder:text-[#5C4330]/60 dark:placeholder:text-[#B8A88A]/60" />
            </div>
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="relative hover:bg-[rgba(212,175,55,0.1)]" onClick={() => onNavigate('messages')}>
              <Bell className="w-5 h-5 text-[#5C4330] dark:text-[#B8A88A]" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#C96850] rounded-full text-[10px] text-white flex items-center justify-center">6</span>
            </Button>
            <Avatar className="w-9 h-9 border-2 border-[#D4AF37] cursor-pointer" onClick={() => onNavigate('profile')}>
              <AvatarImage src="/images/creators/creator1.png" alt="User" />
              <AvatarFallback className="bg-[#81B29A] text-white">ML</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 lg:p-8 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats Cards */}
          <section className="animate-fade-in">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {statsCards.map((stat, index) => (
                <Card key={index} className="bg-white dark:bg-[#2D2416] border border-[#E8E5D8] dark:border-[rgba(212,175,55,0.2)] hover:shadow-lg dark:hover:shadow-[rgba(212,175,55,0.1)] transition-all duration-300">
                  <CardContent className="p-4 lg:p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-[#5C4330] dark:text-[#B8A88A] text-sm mb-1">{stat.label}</p>
                        <p className={`text-2xl lg:text-3xl font-bold ${isDark ? 'text-[#D4AF37]' : stat.color}`}>{stat.value}</p>
                        <div className={`flex items-center gap-1 text-xs mt-1 ${stat.trendUp ? 'text-[#81B29A]' : 'text-[#E8947B]'}`}>
                          {stat.trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          {stat.trend}
                        </div>
                      </div>
                      <div className={`${isDark ? 'bg-[rgba(212,175,55,0.1)]' : 'bg-opacity-10'} p-2 rounded-lg`}>
                        <stat.icon className={`w-5 h-5 ${isDark ? 'text-[#D4AF37]' : stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Quick Actions & Widgets Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Projects & Actions */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Actions */}
              <Card className="bg-white dark:bg-[#2D2416] border border-[#E8E5D8] dark:border-[rgba(212,175,55,0.2)] animate-fade-in">
                <CardContent className="p-4">
                  <h3 className="font-fredoka text-sm font-semibold text-[#3D2914] dark:text-[#F5F0E8] mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#D4AF37]" /> Actions rapides
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" className="bg-[#D4AF37] hover:bg-[#F4E5C2] text-[#1A1410] rounded-lg gap-1 font-medium" onClick={() => onNavigate('new-project')}>
                      <Plus className="w-4 h-4" /> Nouveau Projet
                    </Button>
                    <Button size="sm" variant="outline" className="border-[#C96850] text-[#C96850] hover:bg-[#C96850] hover:text-white rounded-lg gap-1" onClick={() => onNavigate('shop-manage')}>
                      <FileText className="w-4 h-4" /> Nouveau Patron
                    </Button>
                    <Button size="sm" variant="outline" className="border-[#81B29A] text-[#81B29A] hover:bg-[#81B29A] hover:text-white rounded-lg gap-1" onClick={() => onNavigate('planner')}>
                      <CalendarDays className="w-4 h-4" /> Planifier
                    </Button>
                    <Button size="sm" variant="outline" className="border-[#E8E5D8] dark:border-[rgba(212,175,55,0.3)] text-[#3D2914] dark:text-[#F5F0E8] rounded-lg gap-1" onClick={() => onNavigate('analytics')}>
                      <BarChart3 className="w-4 h-4" /> Statistiques
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Projects Table */}
              <Card className="bg-white dark:bg-[#2D2416] border border-[#E8E5D8] dark:border-[rgba(212,175,55,0.2)] animate-fade-in">
                <CardHeader className="pb-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <CardTitle className="font-fredoka text-lg text-[#3D2914] dark:text-[#F5F0E8] flex items-center gap-2">
                      <FolderOpen className="w-5 h-5 text-[#C96850]" /> Mes Projets
                    </CardTitle>
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                      <TabsList className="bg-[#F5F3E1] dark:bg-[#1A1410] h-auto p-1 border border-[#E8E5D8] dark:border-[rgba(212,175,55,0.2)]">
                        <TabsTrigger value="Tous" className="text-xs px-3 data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#1A1410]">Tous</TabsTrigger>
                        <TabsTrigger value="Publiés" className="text-xs px-3 data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#1A1410]">Publiés</TabsTrigger>
                        <TabsTrigger value="Brouillons" className="text-xs px-3 data-[state=active]:bg-[#D4AF37] data-[state=active]:text-[#1A1410]">Brouillons</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#E8E5D8] dark:border-[rgba(212,175,55,0.2)] text-left">
                          <th className="pb-3 text-xs font-medium text-[#5C4330] dark:text-[#B8A88A]">Projet</th>
                          <th className="pb-3 text-xs font-medium text-[#5C4330] dark:text-[#B8A88A] hidden sm:table-cell">Catégorie</th>
                          <th className="pb-3 text-xs font-medium text-[#5C4330] dark:text-[#B8A88A]">Statut</th>
                          <th className="pb-3 text-xs font-medium text-[#5C4330] dark:text-[#B8A88A] hidden md:table-cell">Stats</th>
                          <th className="pb-3 text-xs font-medium text-[#5C4330] dark:text-[#B8A88A]">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProjects.slice(0, 5).map((project, index) => (
                          <tr key={project.id} className={`border-b border-[#E8E5D8]/50 dark:border-[rgba(212,175,55,0.1)] hover:bg-[#F5F3E1]/50 dark:hover:bg-[rgba(212,175,55,0.05)] transition-colors ${index % 2 === 0 ? 'bg-white dark:bg-[#2D2416]' : 'bg-[#F5F3E1]/30 dark:bg-[#1A1410]'}`}>
                            <td className="py-3">
                              <div className="flex items-center gap-3">
                                <img src={project.thumbnail} alt={project.title} className="w-10 h-10 rounded-lg object-cover" />
                                <span className="font-medium text-[#3D2914] dark:text-[#F5F0E8] text-sm truncate max-w-[150px]">{project.title}</span>
                              </div>
                            </td>
                            <td className="py-3 hidden sm:table-cell">
                              <Badge variant="secondary" className="bg-[#F5F3E1] dark:bg-[rgba(212,175,55,0.1)] text-[#5C4330] dark:text-[#B8A88A] text-xs border border-[#E8E5D8] dark:border-[rgba(212,175,55,0.2)]">{project.category}</Badge>
                            </td>
                            <td className="py-3">{getStatusBadge(project.status)}</td>
                            <td className="py-3 hidden md:table-cell">
                              <div className="flex items-center gap-3 text-xs text-[#5C4330] dark:text-[#B8A88A]">
                                <span className="flex items-center gap-1"><Heart className="w-3 h-3 text-[#C96850]" />{project.likes}</span>
                                <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{project.views}</span>
                              </div>
                            </td>
                            <td className="py-3">
                              <div className="flex items-center gap-1">
                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-[rgba(212,175,55,0.1)]"><Edit className="w-4 h-4 text-[#5C4330] dark:text-[#B8A88A]" /></Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-[rgba(212,175,55,0.1)]"><Eye className="w-4 h-4 text-[#5C4330] dark:text-[#B8A88A]" /></Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Analytics Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white dark:bg-[#2D2416] border border-[#E8E5D8] dark:border-[rgba(212,175,55,0.2)] animate-fade-in">
                  <CardHeader className="pb-2">
                    <CardTitle className="font-fredoka text-base text-[#3D2914] dark:text-[#F5F0E8] flex items-center gap-2">
                      <TrendIcon className="w-4 h-4 text-[#C96850]" /> Évolution des abonnés
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SimpleLineChart />
                    <div className="flex justify-between mt-2 text-xs text-[#5C4330] dark:text-[#B8A88A]">
                      <span>1 Mars</span>
                      <span>15 Mars</span>
                      <span>30 Mars</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-[#2D2416] border border-[#E8E5D8] dark:border-[rgba(212,175,55,0.2)] animate-fade-in">
                  <CardHeader className="pb-2">
                    <CardTitle className="font-fredoka text-base text-[#3D2914] dark:text-[#F5F0E8] flex items-center gap-2">
                      <PieChart className="w-4 h-4 text-[#81B29A]" /> Répartition des likes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SimplePieChart />
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right Column - Widgets */}
            <div className="space-y-6">
              {/* Revenue Widget */}
              <Card className="bg-gradient-to-br from-[#D4AF37] to-[#B8962F] border-0 text-[#1A1410] animate-fade-in shadow-lg shadow-[rgba(212,175,55,0.3)]">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-fredoka font-semibold">Revenus du mois</h3>
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <p className="text-3xl font-bold mb-1">{shopStats.totalSales.toFixed(2)}€</p>
                  <p className="text-sm text-[#1A1410]/70">+23% vs mois dernier</p>
                  <Button size="sm" variant="secondary" className="mt-3 w-full bg-white/20 hover:bg-white/30 text-[#1A1410] border-0" onClick={() => onNavigate('shop-manage')}>
                    Voir les détails <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>

              {/* Activity Widget */}
              <Card className="bg-white dark:bg-[#2D2416] border border-[#E8E5D8] dark:border-[rgba(212,175,55,0.2)] animate-fade-in">
                <CardHeader className="pb-2">
                  <CardTitle className="font-fredoka text-base text-[#3D2914] dark:text-[#F5F0E8] flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#E8947B]" /> Activité récente
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {notifications.slice(0, 4).map((notif) => (
                    <div key={notif.id} className={`flex items-start gap-3 p-2 rounded-lg ${!notif.read ? 'bg-[#F5F3E1]/50 dark:bg-[rgba(212,175,55,0.05)]' : ''}`}>
                      <div className="mt-0.5">{notif.icon}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[#3D2914] dark:text-[#F5F0E8] font-medium">{notif.title}</p>
                        <p className="text-xs text-[#5C4330] dark:text-[#B8A88A] truncate">{notif.message}</p>
                        <p className="text-xs text-[#5C4330]/50 dark:text-[#B8A88A]/60 mt-1">{notif.time}</p>
                      </div>
                    </div>
                  ))}
                  <Button variant="ghost" size="sm" className="w-full text-[#81B29A] hover:text-[#5F9A7A] text-xs" onClick={() => onNavigate('messages')}>
                    Voir toutes les notifications
                  </Button>
                </CardContent>
              </Card>

              {/* Goals Widget */}
              <Card className="bg-white dark:bg-[#2D2416] border border-[#E8E5D8] dark:border-[rgba(212,175,55,0.2)] animate-fade-in">
                <CardHeader className="pb-2">
                  <CardTitle className="font-fredoka text-base text-[#3D2914] dark:text-[#F5F0E8] flex items-center gap-2">
                    <Target className="w-4 h-4 text-[#C96850]" /> Objectifs du mois
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-[#3D2914] dark:text-[#F5F0E8]">Publier 5 projets</span>
                      <span className="text-[#81B29A] font-medium text-xs">3/5</span>
                    </div>
                    <Progress value={60} className="h-2 bg-[#F5F3E1] dark:bg-[rgba(212,175,55,0.1)] [&>div]:bg-[#81B29A]" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-[#3D2914] dark:text-[#F5F0E8]">50 abonnés</span>
                      <span className="text-[#D4AF37] font-medium text-xs">38/50</span>
                    </div>
                    <Progress value={76} className="h-2 bg-[#F5F3E1] dark:bg-[rgba(212,175,55,0.1)] [&>div]:bg-[#D4AF37]" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-[#3D2914] dark:text-[#F5F0E8]">Vendre 10 patrons</span>
                      <span className="text-[#C96850] font-medium text-xs">7/10</span>
                    </div>
                    <Progress value={70} className="h-2 bg-[#F5F3E1] dark:bg-[rgba(212,175,55,0.1)] [&>div]:bg-[#C96850]" />
                  </div>
                </CardContent>
              </Card>

              {/* Suggestions Widget */}
              <Card className="bg-white dark:bg-[#2D2416] border border-[#E8E5D8] dark:border-[rgba(212,175,55,0.2)] animate-fade-in">
                <CardHeader className="pb-2">
                  <CardTitle className="font-fredoka text-base text-[#3D2914] dark:text-[#F5F0E8] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 p-2 bg-[#F5F3E1]/50 dark:bg-[rgba(212,175,55,0.05)] rounded-lg">
                    <Image className="w-8 h-8 text-[#81B29A]" />
                    <div className="flex-1">
                      <p className="text-xs font-medium text-[#3D2914] dark:text-[#F5F0E8]">Ajoutez des photos</p>
                      <p className="text-xs text-[#5C4330] dark:text-[#B8A88A]">Les projets avec 3+ photos ont 40% plus de likes</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-[#F5F3E1]/50 dark:bg-[rgba(212,175,55,0.05)] rounded-lg">
                    <Clock className="w-8 h-8 text-[#C96850]" />
                    <div className="flex-1">
                      <p className="text-xs font-medium text-[#3D2914] dark:text-[#F5F0E8]">Publiez à 18h</p>
                      <p className="text-xs text-[#5C4330] dark:text-[#B8A88A]">Meilleur moment pour votre audience</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

// Messages Page
function MessagesPage({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1)
  const [newMessage, setNewMessage] = useState('')

  return (
    <div className="flex-1 flex min-h-screen">
      {/* Conversations List */}
      <div className="w-80 border-r border-border dark:border-white/10 bg-white dark:bg-brown-light flex flex-col">
        <div className="p-4 border-b border-border dark:border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-fredoka text-lg font-bold text-brown dark:text-white">Messages</h2>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={onOpenSidebar}>
              <Menu className="w-5 h-5 text-brown dark:text-white" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brown-light dark:text-white/50" />
            <Input placeholder="Rechercher..." className="pl-10 bg-cream dark:bg-brown border-border dark:border-white/10 rounded-lg" />
          </div>
        </div>
        <ScrollArea className="flex-1">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedConversation(conv.id)}
              className={`w-full p-4 flex items-center gap-3 hover:bg-cream/50 dark:hover:bg-white/5 transition-colors border-b border-border/50 dark:border-white/5 ${
                selectedConversation === conv.id ? 'bg-mustard/10' : ''
              }`}
            >
              <div className="relative">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={conv.user.avatar} alt={conv.user.name} />
                  <AvatarFallback className="bg-sage text-white">{conv.user.name[0]}</AvatarFallback>
                </Avatar>
                {conv.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-sage rounded-full border-2 border-white dark:border-brown-light" />
                )}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-brown dark:text-white text-sm truncate">{conv.user.name}</p>
                  <span className="text-xs text-brown-light dark:text-white/50">{conv.time}</span>
                </div>
                <p className="text-xs text-brown-light dark:text-white/60 truncate">{conv.lastMessage}</p>
              </div>
              {conv.unread > 0 && (
                <span className="bg-terracotta text-white text-xs px-2 py-0.5 rounded-full">{conv.unread}</span>
              )}
            </button>
          ))}
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-cream dark:bg-brown">
        {/* Chat Header */}
        <div className="p-4 border-b border-border dark:border-white/10 bg-white dark:bg-brown-light flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={conversations[0].user.avatar} alt={conversations[0].user.name} />
              <AvatarFallback className="bg-sage text-white">{conversations[0].user.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-brown dark:text-white">{conversations[0].user.name}</p>
              <p className="text-xs text-sage">En ligne</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon"><Image className="w-4 h-4 text-brown-light dark:text-white/70" /></Button>
            <Button variant="ghost" size="icon"><MoreHorizontal className="w-4 h-4 text-brown-light dark:text-white/70" /></Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] ${msg.isOwn ? 'order-2' : ''}`}>
                  {!msg.isOwn && (
                    <div className="flex items-center gap-2 mb-1">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={msg.sender.avatar} alt={msg.sender.name} />
                        <AvatarFallback className="bg-sage text-white text-xs">{msg.sender.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-brown-light dark:text-white/60">{msg.sender.name}</span>
                    </div>
                  )}
                  <div className={`p-3 rounded-2xl ${msg.isOwn ? 'bg-mustard text-brown' : 'bg-white dark:bg-brown-light border border-border dark:border-white/10'}`}>
                    <p className="text-sm">{msg.content}</p>
                    {msg.image && (
                      <img src={msg.image} alt="Shared" className="mt-2 rounded-lg max-w-full" />
                    )}
                  </div>
                  <p className={`text-xs text-brown-light dark:text-white/50 mt-1 ${msg.isOwn ? 'text-right' : ''}`}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t border-border dark:border-white/10 bg-white dark:bg-brown-light">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon"><Image className="w-5 h-5 text-brown-light dark:text-white/70" /></Button>
            <Input 
              placeholder="Écrire un message..." 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 bg-cream dark:bg-brown border-border dark:border-white/10 rounded-full"
            />
            <Button className="bg-terracotta hover:bg-terracotta-dark text-white rounded-full" size="icon">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Comments Page
function CommentsPage({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  const [filter, setFilter] = useState<'all' | 'pending' | 'reported'>('all')

  const filteredComments = comments.filter(c => {
    if (filter === 'all') return true
    return c.status === filter
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved': return <Badge className="bg-sage/20 text-sage text-xs">Approuvé</Badge>
      case 'pending': return <Badge className="bg-mustard/20 text-mustard text-xs">En attente</Badge>
      case 'reported': return <Badge className="bg-coral/20 text-coral text-xs">Signalé</Badge>
      default: return null
    }
  }

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-cream dark:bg-brown">
      <header className="sticky top-0 z-30 bg-cream dark:bg-brown border-b border-border dark:border-white/10 px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={onOpenSidebar}>
              <Menu className="w-5 h-5 text-brown dark:text-white" />
            </Button>
            <h1 className="font-fredoka text-xl lg:text-2xl font-bold text-brown dark:text-white">Gestion des commentaires</h1>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 lg:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card className="bg-white dark:bg-brown-light border-border dark:border-white/10">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-brown dark:text-white">{comments.length}</p>
                <p className="text-xs text-brown-light dark:text-white/60">Total</p>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-brown-light border-border dark:border-white/10">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-mustard">{comments.filter(c => c.status === 'pending').length}</p>
                <p className="text-xs text-brown-light dark:text-white/60">En attente</p>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-brown-light border-border dark:border-white/10">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-coral">{comments.filter(c => c.status === 'reported').length}</p>
                <p className="text-xs text-brown-light dark:text-white/60">Signalés</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-6">
            <Button variant={filter === 'all' ? 'default' : 'outline'} onClick={() => setFilter('all')} className={`rounded-full ${filter === 'all' ? 'bg-terracotta text-white' : ''}`}>Tous</Button>
            <Button variant={filter === 'pending' ? 'default' : 'outline'} onClick={() => setFilter('pending')} className={`rounded-full ${filter === 'pending' ? 'bg-mustard text-brown' : ''}`}>En attente</Button>
            <Button variant={filter === 'reported' ? 'default' : 'outline'} onClick={() => setFilter('reported')} className={`rounded-full ${filter === 'reported' ? 'bg-coral text-white' : ''}`}>Signalés</Button>
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {filteredComments.map((comment) => (
              <Card key={comment.id} className="bg-white dark:bg-brown-light border-border dark:border-white/10">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                      <AvatarFallback className="bg-sage text-white">{comment.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-medium text-brown dark:text-white">{comment.user.name}</p>
                          <p className="text-xs text-brown-light dark:text-white/60">sur "{comment.project}" • {comment.time}</p>
                        </div>
                        {getStatusBadge(comment.status)}
                      </div>
                      <p className="text-sm text-brown-light dark:text-white/80 mb-3">{comment.content}</p>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="border-sage text-sage hover:bg-sage hover:text-white rounded-lg">
                          <ThumbsUp className="w-4 h-4 mr-1" /> {comment.likes}
                        </Button>
                        <Button size="sm" variant="outline" className="border-border dark:border-white/20 rounded-lg">
                          <Reply className="w-4 h-4 mr-1" /> Répondre
                        </Button>
                        {comment.status === 'pending' && (
                          <Button size="sm" className="bg-sage hover:bg-sage-dark text-white rounded-lg">
                            <Check className="w-4 h-4 mr-1" /> Approuver
                          </Button>
                        )}
                        {comment.status === 'reported' && (
                          <Button size="sm" className="bg-coral hover:bg-coral-dark text-white rounded-lg">
                            <Trash2 className="w-4 h-4 mr-1" /> Supprimer
                          </Button>
                        )}
                        <Button size="sm" variant="ghost" className="text-brown-light dark:text-white/70">
                          <Flag className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

// Analytics Page
function AnalyticsPage({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-cream dark:bg-brown">
      <header className="sticky top-0 z-30 bg-cream dark:bg-brown border-b border-border dark:border-white/10 px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={onOpenSidebar}>
              <Menu className="w-5 h-5 text-brown dark:text-white" />
            </Button>
            <h1 className="font-fredoka text-xl lg:text-2xl font-bold text-brown dark:text-white">Statistiques avancées</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="border-border dark:border-white/20 rounded-lg gap-2">
              <Download className="w-4 h-4" /> Exporter
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Top Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Taux d\'engagement', value: '4.8%', trend: '+0.5%', icon: Activity, color: 'terracotta' },
              { label: 'Temps moyen de lecture', value: '2:45', trend: '+15s', icon: Clock, color: 'sage' },
              { label: 'Portée totale', value: '45.2K', trend: '+12%', icon: Eye, color: 'mustard' },
              { label: 'Partages', value: '892', trend: '+23%', icon: Share2, color: 'coral' },
            ].map((stat, i) => (
              <Card key={i} className="bg-white dark:bg-brown-light border-border dark:border-white/10">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <stat.icon className={`w-5 h-5 text-${stat.color}`} />
                    <span className="text-xs text-sage">{stat.trend}</span>
                  </div>
                  <p className="text-2xl font-bold text-brown dark:text-white mt-2">{stat.value}</p>
                  <p className="text-xs text-brown-light dark:text-white/60">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white dark:bg-brown-light border-border dark:border-white/10">
              <CardHeader>
                <CardTitle className="font-fredoka text-base text-brown dark:text-white">Évolution mensuelle</CardTitle>
              </CardHeader>
              <CardContent>
                <SimpleLineChart />
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-brown-light border-border dark:border-white/10">
              <CardHeader>
                <CardTitle className="font-fredoka text-base text-brown dark:text-white">Répartition par catégorie</CardTitle>
              </CardHeader>
              <CardContent>
                <SimplePieChart />
              </CardContent>
            </Card>
          </div>

          {/* Top Projects */}
          <Card className="bg-white dark:bg-brown-light border-border dark:border-white/10">
            <CardHeader>
              <CardTitle className="font-fredoka text-base text-brown dark:text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-mustard" /> Top 5 des projets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {projects.slice(0, 5).map((project, i) => (
                  <div key={project.id} className="flex items-center gap-4 p-3 bg-cream/50 dark:bg-white/5 rounded-lg">
                    <span className={`font-bold text-lg ${i === 0 ? 'text-mustard' : i === 1 ? 'text-brown-light' : 'text-brown-light/50'}`}>#{i + 1}</span>
                    <img src={project.image} alt={project.title} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1">
                      <p className="font-medium text-brown dark:text-white">{project.title}</p>
                      <p className="text-xs text-brown-light dark:text-white/60">{project.views} vues • {project.likes} likes</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-sage">{((project.likes / project.views) * 100).toFixed(1)}%</p>
                      <p className="text-xs text-brown-light dark:text-white/60">Engagement</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Best Posting Times */}
          <Card className="bg-white dark:bg-brown-light border-border dark:border-white/10">
            <CardHeader>
              <CardTitle className="font-fredoka text-base text-brown dark:text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-sage" /> Meilleurs horaires de publication
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day, i) => (
                  <div key={day} className="text-center">
                    <p className="text-xs text-brown-light dark:text-white/60 mb-2">{day}</p>
                    <div className="h-24 flex items-end justify-center gap-1">
                      {[12, 8, 15, 18, 10, 20, 14].map((h, j) => (
                        <div 
                          key={j} 
                          className={`w-4 rounded-t ${j === 3 ? 'bg-mustard' : 'bg-sage/30'}`} 
                          style={{ height: `${h * 4}px` }}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-brown-light dark:text-white/60 mt-2">18h-20h</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

// Shop Management Page
function ShopManagementPage({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  const { products, addProduct, deleteProduct } = useProducts()
  const [showAddModal, setShowAddModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddProduct = (productData: Omit<Product, 'id' | 'rating' | 'reviews' | 'createdAt'>) => {
    addProduct(productData)
  }

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#FDFCF0] dark:bg-[#1A1410]">
      <header className="sticky top-0 z-30 bg-[#FDFCF0]/95 dark:bg-[#1A1410]/95 backdrop-blur-sm border-b border-[#E8E5D8] dark:border-[#D4AF37]/20 px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden hover:bg-[#F5F3E1] dark:hover:bg-[#2D2416]" onClick={onOpenSidebar}>
              <Menu className="w-5 h-5 text-[#3D2914] dark:text-[#F5F0E8]" />
            </Button>
            <div>
              <h1 className="font-fredoka text-xl lg:text-2xl font-bold text-[#3D2914] dark:text-[#F5F0E8]">Gestion Boutique</h1>
              <p className="text-xs text-[#5C4330] dark:text-[#B8A88A] hidden sm:block">{products.length} produits dans votre boutique</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => setShowAddModal(true)} className="bg-[#D4AF37] hover:bg-[#B8962F] text-[#1A1410] rounded-lg gap-2 font-medium">
              <Plus className="w-4 h-4" /> Ajouter un article
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <AddProductModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddProduct}
      />

      <main className="flex-1 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <Card className="bg-gradient-to-br from-[#D4AF37] to-[#B8962F] border-0 text-[#1A1410]">
              <CardContent className="p-4">
                <DollarSign className="w-5 h-5 mb-2" />
                <p className="text-2xl font-bold">{products.reduce((sum, p) => sum + p.price * (p.reviews || 0), 0).toFixed(2)}€</p>
                <p className="text-xs text-[#1A1410]/70">Ventes totales</p>
              </CardContent>
            </Card>
            <Card className="bg-[#F5F3E1] dark:bg-[#2D2416] border border-[#E8E5D8] dark:border-[#D4AF37]/20">
              <CardContent className="p-4">
                <ShoppingBag className="w-5 h-5 text-[#81B29A] mb-2" />
                <p className="text-2xl font-bold text-[#3D2914] dark:text-[#F5F0E8]">{products.length}</p>
                <p className="text-xs text-[#5C4330] dark:text-[#B8A88A]">Produits</p>
              </CardContent>
            </Card>
            <Card className="bg-[#F5F3E1] dark:bg-[#2D2416] border border-[#E8E5D8] dark:border-[#D4AF37]/20">
              <CardContent className="p-4">
                <Clock className="w-5 h-5 text-[#C96850] mb-2" />
                <p className="text-2xl font-bold text-[#3D2914] dark:text-[#F5F0E8]">{products.filter(p => (p.stock || 999) < 999).length}</p>
                <p className="text-xs text-[#5C4330] dark:text-[#B8A88A]">Stock limité</p>
              </CardContent>
            </Card>
            <Card className="bg-[#F5F3E1] dark:bg-[#2D2416] border border-[#E8E5D8] dark:border-[#D4AF37]/20">
              <CardContent className="p-4">
                <Package className="w-5 h-5 text-[#81B29A] mb-2" />
                <p className="text-2xl font-bold text-[#3D2914] dark:text-[#F5F0E8]">{products.reduce((sum, p) => sum + (p.stock || 999), 0)}</p>
                <p className="text-xs text-[#5C4330] dark:text-[#B8A88A]">Total stock</p>
              </CardContent>
            </Card>
            <Card className="bg-[#F5F3E1] dark:bg-[#2D2416] border border-[#E8E5D8] dark:border-[#D4AF37]/20">
              <CardContent className="p-4">
                <AlertTriangle className="w-5 h-5 text-[#C96850] mb-2" />
                <p className="text-2xl font-bold text-[#3D2914] dark:text-[#F5F0E8]">{products.filter(p => (p.stock || 999) < 20).length}</p>
                <p className="text-xs text-[#5C4330] dark:text-[#B8A88A]">Stock faible</p>
              </CardContent>
            </Card>
          </div>

          {/* Products Table */}
          <Card className="bg-[#F5F3E1] dark:bg-[#2D2416] border border-[#E8E5D8] dark:border-[#D4AF37]/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-fredoka text-base text-[#3D2914] dark:text-[#F5F0E8]">Produits ({filteredProducts.length})</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B8A88A]" />
                    <Input
                      placeholder="Rechercher..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-48 pl-10 bg-[#FDFCF0] dark:bg-[#1A1410] border-[#E8E5D8] dark:border-[#D4AF37]/20 text-[#3D2914] dark:text-[#F5F0E8] rounded-lg"
                    />
                  </div>
                  <Button variant="outline" className="border-[#E8E5D8] dark:border-[#D4AF37]/20 rounded-lg">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border dark:border-white/10 text-left">
                      <th className="pb-3 text-xs font-medium text-brown-light dark:text-white/70">Produit</th>
                      <th className="pb-3 text-xs font-medium text-brown-light dark:text-white/70">Prix</th>
                      <th className="pb-3 text-xs font-medium text-brown-light dark:text-white/70">Stock</th>
                      <th className="pb-3 text-xs font-medium text-brown-light dark:text-white/70">Ventes</th>
                      <th className="pb-3 text-xs font-medium text-brown-light dark:text-white/70">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product, i) => (
                      <tr key={product.id} className={`border-b border-[#E8E5D8]/50 dark:border-[#D4AF37]/5 ${i % 2 === 0 ? '' : 'bg-[#F5F3E1]/30 dark:bg-[#F5F0E8]/5'}`}>
                        <td className="py-3">
                          <div className="flex items-center gap-3">
                            <img src={product.image} alt={product.title} className="w-10 h-10 rounded-lg object-cover" />
                            <div>
                              <p className="font-medium text-[#3D2914] dark:text-[#F5F0E8] text-sm">{product.title}</p>
                              <p className="text-xs text-[#5C4330] dark:text-[#B8A88A]">{product.category}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 text-[#3D2914] dark:text-[#F5F0E8] font-medium">{product.price.toFixed(2)}€</td>
                        <td className="py-3">
                          <Badge className={`${(product.stock || 999) < 20 ? 'bg-[#E07A5F]/20 text-[#E07A5F]' : 'bg-[#81B29A]/20 text-[#81B29A]'} text-xs`}>
                            {product.stock || 999}
                          </Badge>
                        </td>
                        <td className="py-3 text-[#5C4330] dark:text-[#B8A88A]">{product.reviews || 0}</td>
                        <td className="py-3">
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-[#D4AF37]/10"><Edit className="w-4 h-4 text-[#B8A88A]" /></Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-[#D4AF37]/10"><Eye className="w-4 h-4 text-[#B8A88A]" /></Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-[#E07A5F]/10" onClick={() => deleteProduct(product.id)}><Trash2 className="w-4 h-4 text-[#E07A5F]" /></Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

// Content Planner Page
function PlannerPage({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-cream dark:bg-brown">
      <header className="sticky top-0 z-30 bg-cream dark:bg-brown border-b border-border dark:border-white/10 px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={onOpenSidebar}>
              <Menu className="w-5 h-5 text-brown dark:text-white" />
            </Button>
            <h1 className="font-fredoka text-xl lg:text-2xl font-bold text-brown dark:text-white">Planificateur de contenu</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button className="bg-mustard hover:bg-mustard-dark text-brown rounded-lg gap-2">
              <Plus className="w-4 h-4" /> Nouvel événement
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 lg:p-8">
        <div className="max-w-5xl mx-auto">
          {/* Mini Calendar Header */}
          <Card className="bg-white dark:bg-brown-light border-border dark:border-white/10 mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-fredoka text-base text-brown dark:text-white">Mars 2024</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="border-border dark:border-white/20"><ChevronRight className="w-4 h-4 rotate-180" /></Button>
                  <Button variant="outline" size="icon" className="border-border dark:border-white/20"><ChevronRight className="w-4 h-4" /></Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
                  <div key={day} className="text-center text-xs text-brown-light dark:text-white/60 py-2">{day}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 35 }, (_, i) => {
                  const day = i - 4 // Start from previous month
                  const hasEvent = calendarEvents.some(e => parseInt(e.date.split(' ')[0]) === day)
                  const isToday = day === 16
                  return (
                    <div 
                      key={i} 
                      className={`aspect-square flex items-center justify-center text-sm rounded-lg ${
                        day < 1 ? 'text-brown-light/30 dark:text-white/20' : 
                        isToday ? 'bg-mustard text-brown font-bold' : 
                        'hover:bg-cream dark:hover:bg-white/5 cursor-pointer'
                      }`}
                    >
                      {day > 0 && day <= 31 ? day : ''}
                      {hasEvent && day > 0 && <span className="absolute -bottom-1 w-1 h-1 bg-terracotta rounded-full" />}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Scheduled Events */}
          <h3 className="font-fredoka text-lg font-semibold text-brown dark:text-white mb-4">Événements planifiés</h3>
          <div className="space-y-3">
            {calendarEvents.map((event) => (
              <Card key={event.id} className="bg-white dark:bg-brown-light border-border dark:border-white/10">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      event.type === 'publication' ? 'bg-terracotta/10' :
                      event.type === 'live' ? 'bg-coral/10' :
                      event.type === 'deadline' ? 'bg-mustard/10' : 'bg-sage/10'
                    }`}>
                      {event.type === 'publication' && <Camera className="w-5 h-5 text-terracotta" />}
                      {event.type === 'live' && <Video className="w-5 h-5 text-coral" />}
                      {event.type === 'deadline' && <AlertCircle className="w-5 h-5 text-mustard" />}
                      {event.type === 'reminder' && <Bell className="w-5 h-5 text-sage" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-brown dark:text-white">{event.title}</p>
                      <p className="text-xs text-brown-light dark:text-white/60">{event.date} • {event.type}</p>
                    </div>
                    <Badge className={`
                      ${event.status === 'scheduled' ? 'bg-sage/20 text-sage' : 
                        event.status === 'published' ? 'bg-terracotta/20 text-terracotta' : 
                        'bg-muted text-brown-light'}
                    `}>
                      {event.status === 'scheduled' ? 'Planifié' : event.status === 'published' ? 'Publié' : 'Brouillon'}
                    </Badge>
                    <Button variant="ghost" size="icon"><Edit className="w-4 h-4" /></Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

// Subscribers Page
function SubscribersPage({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  const [filter, setFilter] = useState<'all' | 'active' | 'new' | 'inactive'>('all')

  const filteredSubscribers = subscribers.filter(s => {
    if (filter === 'all') return true
    return s.status === filter
  })

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-cream dark:bg-brown">
      <header className="sticky top-0 z-30 bg-cream dark:bg-brown border-b border-border dark:border-white/10 px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={onOpenSidebar}>
              <Menu className="w-5 h-5 text-brown dark:text-white" />
            </Button>
            <h1 className="font-fredoka text-xl lg:text-2xl font-bold text-brown dark:text-white">Gestion des abonnés</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="border-border dark:border-white/20 rounded-lg gap-2">
              <Mail className="w-4 h-4" /> Message groupé
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 lg:p-8">
        <div className="max-w-5xl mx-auto">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <Card className="bg-white dark:bg-brown-light border-border dark:border-white/10">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-brown dark:text-white">1,247</p>
                <p className="text-xs text-brown-light dark:text-white/60">Total</p>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-brown-light border-border dark:border-white/10">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-sage">892</p>
                <p className="text-xs text-brown-light dark:text-white/60">Actifs</p>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-brown-light border-border dark:border-white/10">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-mustard">156</p>
                <p className="text-xs text-brown-light dark:text-white/60">Nouveaux</p>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-brown-light border-border dark:border-white/10">
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-coral">199</p>
                <p className="text-xs text-brown-light dark:text-white/60">Inactifs</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brown-light dark:text-white/50" />
              <Input placeholder="Rechercher un abonné..." className="pl-10 bg-white dark:bg-brown-light border-border dark:border-white/10 rounded-lg" />
            </div>
            <div className="flex gap-2">
              {['all', 'active', 'new', 'inactive'].map((f) => (
                <Button 
                  key={f} 
                  variant={filter === f ? 'default' : 'outline'} 
                  onClick={() => setFilter(f as typeof filter)}
                  className={`rounded-lg ${filter === f ? 'bg-terracotta text-white' : 'border-border dark:border-white/20'}`}
                >
                  {f === 'all' ? 'Tous' : f === 'active' ? 'Actifs' : f === 'new' ? 'Nouveaux' : 'Inactifs'}
                </Button>
              ))}
            </div>
          </div>

          {/* Subscribers List */}
          <Card className="bg-white dark:bg-brown-light border-border dark:border-white/10">
            <CardContent className="p-0">
              <div className="divide-y divide-border dark:divide-white/10">
                {filteredSubscribers.map((sub) => (
                  <div key={sub.id} className="flex items-center gap-4 p-4 hover:bg-cream/50 dark:hover:bg-white/5">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={sub.avatar} alt={sub.name} />
                      <AvatarFallback className="bg-sage text-white">{sub.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-brown dark:text-white">{sub.name}</p>
                      <p className="text-xs text-brown-light dark:text-white/60">{sub.location} • Abonné depuis {sub.joinedAt}</p>
                    </div>
                    <Badge className={`
                      ${sub.status === 'active' ? 'bg-sage/20 text-sage' : 
                        sub.status === 'new' ? 'bg-mustard/20 text-mustard' : 
                        'bg-coral/20 text-coral'}
                    `}>
                      {sub.status === 'active' ? 'Actif' : sub.status === 'new' ? 'Nouveau' : 'Inactif'}
                    </Badge>
                    <Button variant="ghost" size="icon"><MessageSquare className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon"><MoreHorizontal className="w-4 h-4" /></Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

// ============================================
// CREATORS PAGE - Tous les créateurs
// ============================================

function CreatorsPage({ onNavigate, onSelectCreator }: { onNavigate: (view: ViewType) => void; onSelectCreator: (creator: typeof creators[0]) => void }) {
  const { theme } = useTheme()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all')

  const specialties = ['all', 'Amigurumi', 'Vêtements', 'Maison', 'Bébé', 'Accessoires', 'Patrons']

  const filteredCreators = creators.filter(creator => {
    if (selectedSpecialty !== 'all' && creator.specialty !== selectedSpecialty) return false
    if (searchQuery && !creator.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <div className="min-h-screen bg-[#FDFCF0] dark:bg-[#1A1410]">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#FDFCF0]/95 dark:bg-[#1A1410]/95 backdrop-blur-sm border-b border-[#E8E5D8] dark:border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => onNavigate('landing')} className="text-[#3D2914] dark:text-[#F5F0E8]">
                <ArrowRight className="w-4 h-4 mr-2 rotate-180" /> Retour
              </Button>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-[#3D2914] dark:text-[#F5F0E8]" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Nos Créateurs
                </h1>
                <p className="text-xs text-[#5C4330] dark:text-[#B8A88A]">Découvrez les talents de notre communauté</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => onNavigate('boutique')} className="border-[#D4AF37]/30 text-[#D4AF37] rounded-full">
                <ShoppingBag className="w-5 h-5 mr-2" /> Boutique
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="bg-[#F5F3E1] dark:bg-[#2D2416] border-b border-[#E8E5D8] dark:border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              {specialties.map((spec) => (
                <Button
                  key={spec}
                  variant={selectedSpecialty === spec ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedSpecialty(spec)}
                  className={`rounded-full whitespace-nowrap ${
                    selectedSpecialty === spec
                      ? 'bg-[#D4AF37] text-[#1A1410] hover:bg-[#B8962F]'
                      : 'border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10'
                  }`}
                >
                  {spec === 'all' ? 'Tous' : spec}
                </Button>
              ))}
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B8A88A]" />
              <Input
                placeholder="Rechercher un créateur..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#FDFCF0] dark:bg-[#1A1410] border-[#E8E5D8] dark:border-[#D4AF37]/20 text-[#3D2914] dark:text-[#F5F0E8] rounded-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Creators Grid */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <p className="text-[#5C4330] dark:text-[#B8A88A] text-sm mb-6">
          {filteredCreators.length} créateur{filteredCreators.length > 1 ? 's' : ''} trouvé{filteredCreators.length > 1 ? 's' : ''}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCreators.map((creator) => (
            <Card
              key={creator.id}
              className="group bg-[#F5F3E1] dark:bg-[#2D2416] border border-[#E8E5D8] dark:border-[#D4AF37]/20 overflow-hidden hover:border-[#D4AF37]/40 transition-all shadow-sm hover:shadow-lg cursor-pointer"
              onClick={() => onSelectCreator(creator)}
            >
              <div className="h-24 bg-gradient-to-r from-[#E07A5F]/80 via-[#D4AF37]/80 to-[#81B29A]/80" />
              <CardContent className="p-6 -mt-12 relative">
                <div className="flex items-end gap-4 mb-4">
                  <Avatar className="w-20 h-20 border-4 border-[#F5F3E1] dark:border-[#2D2416] shadow-lg">
                    <AvatarImage src={creator.avatar} alt={creator.name} />
                    <AvatarFallback className="bg-[#D4AF37] text-[#1A1410] text-xl">{creator.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0 pb-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-[#3D2914] dark:text-[#F5F0E8] truncate">{creator.name}</h3>
                      <Crown className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                    </div>
                    <p className="text-sm text-[#81B29A]">{creator.specialty}</p>
                  </div>
                </div>
                <p className="text-sm text-[#5C4330] dark:text-[#B8A88A] mb-4 line-clamp-2">{creator.bio}</p>
                <div className="flex items-center gap-4 text-sm text-[#5C4330] dark:text-[#B8A88A] mb-4">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{creator.location}</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#E8E5D8] dark:border-[#D4AF37]/20">
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1 text-[#D4AF37] font-medium"><Users className="w-4 h-4" />{creator.followers}</span>
                    <span className="flex items-center gap-1 text-[#81B29A]"><FolderOpen className="w-4 h-4" />{creator.projects}</span>
                  </div>
                  <Button size="sm" className="bg-[#E07A5F] hover:bg-[#C96850] text-white rounded-full" onClick={(e) => { e.stopPropagation(); onSelectCreator(creator) }}>
                    Voir le profil
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCreators.length === 0 && (
          <div className="text-center py-16">
            <Users className="w-16 h-16 text-[#B8A88A]/40 mx-auto mb-4" />
            <p className="text-[#5C4330] dark:text-[#B8A88A]">Aucun créateur trouvé</p>
          </div>
        )}
      </main>

      <footer className="bg-gradient-to-r from-[#3D2914] via-[#2D2416] to-[#3D2914] text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center">
          <p className="text-white/60 text-sm">© 2024 Crochetti - Tous droits réservés</p>
        </div>
      </footer>
    </div>
  )
}

// ============================================
// PUBLIC BOUTIQUE PAGE
// ============================================

function PublicBoutiquePage({ onNavigate, onSelectProduct }: { onNavigate: (view: ViewType) => void; onSelectProduct: (product: Product) => void }) {
  const { theme } = useTheme()
  const { products } = useProducts()
  const { addToCart, totalItems } = useCart()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'price-low' | 'price-high'>('popular')

  const filteredProducts = products.filter(p => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false
    if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price
      case 'price-high': return b.price - a.price
      case 'newest': return (b.createdAt || '').localeCompare(a.createdAt || '')
      default: return b.reviews - a.reviews
    }
  })

  const categories = ['all', 'Patrons', 'Kits', 'Accessoires', 'Maison']

  return (
    <div className="min-h-screen bg-[#FDFCF0] dark:bg-[#1A1410]">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#FDFCF0]/95 dark:bg-[#1A1410]/95 backdrop-blur-sm border-b border-[#E8E5D8] dark:border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => onNavigate('landing')} className="text-[#3D2914] dark:text-[#F5F0E8]">
                <ArrowRight className="w-4 h-4 mr-2 rotate-180" /> Retour
              </Button>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-[#3D2914] dark:text-[#F5F0E8]" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Boutique Crochetti
                </h1>
                <p className="text-xs text-[#5C4330] dark:text-[#B8A88A]">Découvrez les créations de nos artisans</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => onNavigate('cart')} className="relative border-[#D4AF37]/30 text-[#D4AF37] rounded-full">
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#E07A5F] text-white text-xs rounded-full flex items-center justify-center">{totalItems}</span>
                )}
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="bg-[#F5F3E1] dark:bg-[#2D2416] border-b border-[#E8E5D8] dark:border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full whitespace-nowrap ${selectedCategory === cat ? 'bg-[#D4AF37] text-[#1A1410] hover:bg-[#B8962F]' : 'border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10'}`}
                >
                  {cat === 'all' ? 'Tous' : cat}
                </Button>
              ))}
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B8A88A]" />
                <Input placeholder="Rechercher..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 bg-[#FDFCF0] dark:bg-[#1A1410] border-[#E8E5D8] dark:border-[#D4AF37]/20 text-[#3D2914] dark:text-[#F5F0E8] rounded-full" />
              </div>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)} className="px-4 py-2 bg-[#FDFCF0] dark:bg-[#1A1410] border border-[#E8E5D8] dark:border-[#D4AF37]/20 rounded-full text-[#3D2914] dark:text-[#F5F0E8] text-sm">
                <option value="popular">Popularité</option>
                <option value="newest">Plus récents</option>
                <option value="price-low">Prix croissant</option>
                <option value="price-high">Prix décroissant</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <p className="text-[#5C4330] dark:text-[#B8A88A] text-sm mb-6">{filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group bg-[#F5F3E1] dark:bg-[#2D2416] border border-[#E8E5D8] dark:border-[#D4AF37]/20 overflow-hidden hover:border-[#D4AF37]/40 transition-all shadow-sm hover:shadow-lg cursor-pointer" onClick={() => onSelectProduct(product)}>
              <div className="aspect-square relative overflow-hidden bg-[#E8E5D8]/30 dark:bg-[#1A1410]">
                <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <Badge className="absolute top-3 left-3 bg-[#D4AF37]/90 text-[#1A1410]">{product.category}</Badge>
                {product.stock !== undefined && product.stock < 20 && <div className="absolute top-3 right-3 bg-[#E07A5F] text-white text-xs px-2 py-1 rounded-full">Stock limité</div>}
                {product.featured && <div className="absolute bottom-3 left-3 bg-[#D4AF37] text-[#1A1410] text-xs px-2 py-1 rounded-full flex items-center gap-1"><Sparkles className="w-3 h-3" /> Vedette</div>}
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium text-[#3D2914] dark:text-[#F5F0E8] text-sm mb-1 truncate">{product.title}</h3>
                <p className="text-xs text-[#81B29A] mb-2">par {product.creator}</p>
                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                  <span className="text-sm text-[#3D2914] dark:text-[#F5F0E8]">{product.rating}</span>
                  <span className="text-xs text-[#5C4330] dark:text-[#B8A88A]">({product.reviews} avis)</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-[#D4AF37]">{product.price.toFixed(2)}€</p>
                  <Button size="sm" onClick={(e) => { e.stopPropagation(); addToCart(product) }} className="bg-[#E07A5F] hover:bg-[#C96850] text-white rounded-full">
                    <ShoppingCart className="w-4 h-4 mr-1" /> Ajouter
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 text-[#B8A88A]/40 mx-auto mb-4" />
            <p className="text-[#5C4330] dark:text-[#B8A88A]">Aucun produit trouvé</p>
          </div>
        )}
      </main>

      {/* Floating Cart Button */}
      {totalItems > 0 && (
        <button
          onClick={() => onNavigate('cart')}
          className="fixed bottom-6 right-6 z-50 bg-[#E07A5F] hover:bg-[#C96850] text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute -top-2 -right-2 w-6 h-6 bg-[#D4AF37] text-[#1A1410] text-sm font-bold rounded-full flex items-center justify-center">
            {totalItems}
          </span>
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[#2D2416] text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Voir le panier
          </span>
        </button>
      )}

      <footer className="bg-gradient-to-r from-[#3D2914] via-[#2D2416] to-[#3D2914] text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center">
          <p className="text-white/60 text-sm">© 2024 Crochetti - Tous droits réservés</p>
        </div>
      </footer>
    </div>
  )
}

// ============================================
// PRODUCT DETAIL PAGE
// ============================================

function ProductDetailPage({ product, onNavigate, onSelectCreator }: { product: Product; onNavigate: (view: ViewType) => void; onSelectCreator: (creator: typeof creators[0]) => void }) {
  const { addToCart, totalItems } = useCart()
  const { products } = useProducts()
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<'description' | 'details' | 'reviews'>('description')

  const creatorInfo = creators.find(c => c.id === product.creatorId)
  const relatedProducts = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4)

  const mockReviews = [
    { id: 1, author: "Marie D.", avatar: "/images/creators/creator1.png", rating: 5, date: "15 Mars 2024", comment: "Patron très bien expliqué! J'ai réussi à le faire en un week-end." },
    { id: 2, author: "Sophie L.", avatar: "/images/creators/creator2.png", rating: 5, date: "10 Mars 2024", comment: "Magnifique résultat! Le patron est facile à suivre." },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Débutant': return 'bg-[#81B29A]/20 text-[#81B29A] border-[#81B29A]/30'
      case 'Intermédiaire': return 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/30'
      case 'Avancé': return 'bg-[#E07A5F]/20 text-[#E07A5F] border-[#E07A5F]/30'
      default: return 'bg-[#81B29A]/20 text-[#81B29A] border-[#81B29A]/30'
    }
  }

  return (
    <div className="min-h-screen bg-[#FDFCF0] dark:bg-[#1A1410]">
      <header className="sticky top-0 z-30 bg-[#FDFCF0]/95 dark:bg-[#1A1410]/95 backdrop-blur-sm border-b border-[#E8E5D8] dark:border-[#D4AF37]/20 px-4 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Button variant="ghost" onClick={() => onNavigate('boutique')} className="text-[#3D2914] dark:text-[#F5F0E8]">
            <ArrowRight className="w-4 h-4 mr-2 rotate-180" /> Retour à la boutique
          </Button>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#5C4330] dark:text-[#B8A88A] mb-6">
          <button onClick={() => onNavigate('landing')} className="hover:text-[#E07A5F]">Accueil</button>
          <ChevronRight className="w-4 h-4" />
          <button onClick={() => onNavigate('boutique')} className="hover:text-[#E07A5F]">Boutique</button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#D4AF37]">{product.title}</span>
        </nav>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#F5F3E1] dark:bg-[#2D2416] border border-[#E8E5D8] dark:border-[#D4AF37]/20">
            <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
            {product.featured && <Badge className="absolute top-4 left-4 bg-[#D4AF37] text-[#1A1410]"><Sparkles className="w-3 h-3 mr-1" /> Produit vedette</Badge>}
            {product.stock !== undefined && product.stock < 20 && <div className="absolute top-4 right-4 bg-[#E07A5F] text-white text-xs px-3 py-1 rounded-full">Stock limité ({product.stock})</div>}
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-3 bg-[#81B29A]/20 text-[#81B29A] border border-[#81B29A]/30">{product.category}</Badge>
              <h1 className="text-2xl lg:text-3xl font-bold text-[#3D2914] dark:text-[#F5F0E8] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>{product.title}</h1>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-[#B8A88A]'}`} />)}
                </div>
                <span className="text-[#3D2914] dark:text-[#F5F0E8] font-medium">{product.rating}</span>
                <span className="text-[#5C4330] dark:text-[#B8A88A]">({product.reviews} avis)</span>
              </div>
            </div>

            {/* Creator */}
            {creatorInfo && (
              <div className="flex items-center gap-3 p-3 bg-[#F5F3E1] dark:bg-[#2D2416] rounded-xl border border-[#E8E5D8] dark:border-[#D4AF37]/20 cursor-pointer hover:border-[#D4AF37]/40" onClick={() => onSelectCreator(creatorInfo)}>
                <Avatar className="w-12 h-12 border-2 border-[#D4AF37]"><AvatarImage src={product.creatorAvatar || creatorInfo.avatar} /><AvatarFallback>{product.creator[0]}</AvatarFallback></Avatar>
                <div className="flex-1">
                  <p className="font-medium text-[#3D2914] dark:text-[#F5F0E8]">{product.creator}</p>
                  <p className="text-sm text-[#81B29A]">{creatorInfo.specialty} • {creatorInfo.followers} abonnés</p>
                </div>
                <Button variant="outline" size="sm" className="border-[#D4AF37]/30 text-[#D4AF37]">Voir</Button>
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl lg:text-4xl font-bold text-[#D4AF37]">{product.price.toFixed(2)}€</span>
              {product.pages && <span className="text-[#5C4330] dark:text-[#B8A88A]">• {product.pages} pages</span>}
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-3 gap-3">
              {product.difficulty && <div className="text-center p-3 bg-[#F5F3E1] dark:bg-[#2D2416] rounded-xl border border-[#E8E5D8] dark:border-[#D4AF37]/20"><p className="text-xs text-[#5C4330] dark:text-[#B8A88A] mb-1">Difficulté</p><Badge className={getDifficultyColor(product.difficulty)}>{product.difficulty}</Badge></div>}
              {product.timeToComplete && <div className="text-center p-3 bg-[#F5F3E1] dark:bg-[#2D2416] rounded-xl border border-[#E8E5D8] dark:border-[#D4AF37]/20"><p className="text-xs text-[#5C4330] dark:text-[#B8A88A] mb-1">Durée</p><p className="font-medium text-[#3D2914] dark:text-[#F5F0E8]">{product.timeToComplete}</p></div>}
              {product.language && <div className="text-center p-3 bg-[#F5F3E1] dark:bg-[#2D2416] rounded-xl border border-[#E8E5D8] dark:border-[#D4AF37]/20"><p className="text-xs text-[#5C4330] dark:text-[#B8A88A] mb-1">Langue</p><p className="font-medium text-[#3D2914] dark:text-[#F5F0E8]">{product.language}</p></div>}
            </div>

            {/* Quantity & Cart */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-[#E8E5D8] dark:border-[#D4AF37]/20 rounded-lg">
                <Button variant="ghost" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1} className="text-[#3D2914] dark:text-[#F5F0E8]"><Minus className="w-4 h-4" /></Button>
                <span className="w-12 text-center text-[#3D2914] dark:text-[#F5F0E8]">{quantity}</span>
                <Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)} className="text-[#3D2914] dark:text-[#F5F0E8]"><Plus className="w-4 h-4" /></Button>
              </div>
              <Button className="flex-1 bg-[#E07A5F] hover:bg-[#C96850] text-white rounded-xl py-6 text-lg" onClick={() => { for (let i = 0; i < quantity; i++) addToCart(product) }}>
                <ShoppingCart className="w-5 h-5 mr-2" /> Ajouter au panier
              </Button>
            </div>

            {/* Materials */}
            {product.materials && product.materials.length > 0 && (
              <div className="p-4 bg-[#F5F3E1] dark:bg-[#2D2416] rounded-xl border border-[#E8E5D8] dark:border-[#D4AF37]/20">
                <h3 className="font-medium text-[#3D2914] dark:text-[#F5F0E8] mb-2 flex items-center gap-2"><Package className="w-4 h-4 text-[#D4AF37]" /> Matériel nécessaire</h3>
                <ul className="grid grid-cols-2 gap-2">
                  {product.materials.map((material, index) => <li key={index} className="flex items-center gap-2 text-sm text-[#5C4330] dark:text-[#B8A88A]"><Check className="w-3 h-3 text-[#81B29A]" />{material}</li>)}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12">
          <div className="flex border-b border-[#E8E5D8] dark:border-[#D4AF37]/20">
            {(['description', 'details', 'reviews'] as const).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-3 font-medium transition-colors ${activeTab === tab ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]' : 'text-[#5C4330] dark:text-[#B8A88A] hover:text-[#E07A5F]'}`}>
                {tab === 'reviews' ? `Avis (${product.reviews})` : tab === 'details' ? 'Détails' : 'Description'}
              </button>
            ))}
          </div>
          <div className="py-6">
            {activeTab === 'description' && <p className="text-[#5C4330] dark:text-[#B8A88A] leading-relaxed text-lg">{product.description}</p>}
            {activeTab === 'details' && product.details && (
              <div className="space-y-4">
                {product.details.map((detail, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-[#F5F3E1] dark:bg-[#2D2416] rounded-xl border border-[#E8E5D8] dark:border-[#D4AF37]/20">
                    <CheckCircle className="w-5 h-5 text-[#81B29A] mt-0.5" />
                    <span className="text-[#3D2914] dark:text-[#F5F0E8]">{detail}</span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {mockReviews.map((review) => (
                  <div key={review.id} className="p-6 bg-[#F5F3E1] dark:bg-[#2D2416] rounded-xl border border-[#E8E5D8] dark:border-[#D4AF37]/20">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Avatar><AvatarImage src={review.avatar} /><AvatarFallback>{review.author[0]}</AvatarFallback></Avatar>
                        <div>
                          <p className="font-medium text-[#3D2914] dark:text-[#F5F0E8]">{review.author}</p>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-[#B8A88A]'}`} />)}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-[#5C4330] dark:text-[#B8A88A]">{review.date}</span>
                    </div>
                    <p className="text-[#5C4330] dark:text-[#B8A88A]">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold text-[#3D2914] dark:text-[#F5F0E8] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>Produits similaires</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((p) => (
                <Card key={p.id} className="group bg-[#F5F3E1] dark:bg-[#2D2416] border border-[#E8E5D8] dark:border-[#D4AF37]/20 overflow-hidden hover:border-[#D4AF37]/40 cursor-pointer" onClick={() => onSelectProduct(p)}>
                  <div className="aspect-square relative overflow-hidden bg-[#E8E5D8]/30 dark:bg-[#1A1410]">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <Badge className="absolute top-2 left-2 bg-[#D4AF37]/90 text-[#1A1410] text-xs">{p.category}</Badge>
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-medium text-[#3D2914] dark:text-[#F5F0E8] text-sm truncate">{p.title}</h3>
                    <p className="text-xs text-[#81B29A] mb-2">par {p.creator}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-[#D4AF37]">{p.price.toFixed(2)}€</p>
                      <div className="flex items-center gap-1"><Star className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" /><span className="text-xs text-[#3D2914] dark:text-[#F5F0E8]">{p.rating}</span></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="bg-gradient-to-r from-[#3D2914] via-[#2D2416] to-[#3D2914] text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center">
          <p className="text-white/60 text-sm">© 2024 Crochetti - Tous droits réservés</p>
        </div>
      </footer>

      {/* Floating Cart Button */}
      {totalItems > 0 && (
        <button
          onClick={() => onNavigate('cart')}
          className="fixed bottom-6 right-6 z-50 bg-[#E07A5F] hover:bg-[#C96850] text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute -top-2 -right-2 w-6 h-6 bg-[#D4AF37] text-[#1A1410] text-sm font-bold rounded-full flex items-center justify-center">
            {totalItems}
          </span>
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[#2D2416] text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Voir le panier
          </span>
        </button>
      )}
    </div>
  )
}

// ============================================
// CART PAGE
// ============================================

function CartPage({ onNavigate }: { onNavigate: (view: ViewType) => void }) {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart()

  return (
    <div className="min-h-screen bg-[#FDFCF0] dark:bg-[#1A1410]">
      <header className="sticky top-0 z-30 bg-[#FDFCF0]/95 dark:bg-[#1A1410]/95 backdrop-blur-sm border-b border-[#E8E5D8] dark:border-[#D4AF37]/20 px-4 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Button variant="ghost" onClick={() => onNavigate('boutique')} className="text-[#3D2914] dark:text-[#F5F0E8]">
            <ArrowRight className="w-4 h-4 mr-2 rotate-180" /> Continuer les achats
          </Button>
          <h1 className="text-xl font-bold text-[#3D2914] dark:text-[#F5F0E8]" style={{ fontFamily: 'Playfair Display, serif' }}>Mon Panier</h1>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 lg:px-8 py-8">
        {items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="w-16 h-16 text-[#B8A88A]/40 mx-auto mb-4" />
            <h2 className="text-xl font-medium text-[#3D2914] dark:text-[#F5F0E8] mb-2">Votre panier est vide</h2>
            <p className="text-[#5C4330] dark:text-[#B8A88A] mb-6">Découvrez nos créations et ajoutez-les à votre panier</p>
            <Button onClick={() => onNavigate('boutique')} className="bg-[#D4AF37] hover:bg-[#B8962F] text-[#1A1410] rounded-full">Parcourir la boutique</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="bg-[#F5F3E1] dark:bg-[#2D2416] border border-[#E8E5D8] dark:border-[#D4AF37]/20">
                  <CardContent className="p-4 flex gap-4">
                    <img src={item.image} alt={item.title} className="w-24 h-24 rounded-lg object-cover" />
                    <div className="flex-1">
                      <h3 className="font-medium text-[#3D2914] dark:text-[#F5F0E8]">{item.title}</h3>
                      <p className="text-sm text-[#81B29A]">par {item.creator}</p>
                      <p className="text-lg font-bold text-[#D4AF37] mt-1">{item.price.toFixed(2)}€</p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)} className="text-[#C96850] hover:bg-[#C96850]/10"><Trash2 className="w-4 h-4" /></Button>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 border-[#D4AF37]/30"><Minus className="w-3 h-3" /></Button>
                        <span className="w-8 text-center text-[#3D2914] dark:text-[#F5F0E8]">{item.quantity}</span>
                        <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 border-[#D4AF37]/30"><Plus className="w-3 h-3" /></Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button variant="ghost" onClick={clearCart} className="text-[#C96850] hover:bg-[#C96850]/10">Vider le panier</Button>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <Card className="bg-[#F5F3E1] dark:bg-[#2D2416] border border-[#E8E5D8] dark:border-[#D4AF37]/20 sticky top-24">
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-lg font-bold text-[#3D2914] dark:text-[#F5F0E8]">Résumé</h2>
                  <div className="flex justify-between text-[#5C4330] dark:text-[#B8A88A]">
                    <span>{totalItems} article{totalItems > 1 ? 's' : ''}</span>
                    <span>{totalPrice.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between text-[#5C4330] dark:text-[#B8A88A]">
                    <span>Livraison</span>
                    <span className="text-[#81B29A]">Gratuite</span>
                  </div>
                  <Separator className="bg-[#D4AF37]/20" />
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-[#3D2914] dark:text-[#F5F0E8]">Total</span>
                    <span className="text-[#D4AF37]">{totalPrice.toFixed(2)}€</span>
                  </div>
                  <Button onClick={() => onNavigate('checkout')} className="w-full bg-[#D4AF37] hover:bg-[#B8962F] text-[#1A1410] rounded-xl py-6">
                    Passer la commande
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

// ============================================
// CHECKOUT PAGE - Page de commande complète
// ============================================

function CheckoutPage({ onNavigate }: { onNavigate: (view: ViewType) => void }) {
  const { items, totalPrice, clearCart } = useCart()
  const [step, setStep] = useState<'info' | 'payment' | 'success'>('info')
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'orange' | 'wave'>('card')
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Sénégal',
    notes: ''
  })
  
  // Payment form state
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    cardName: '',
    orangeNumber: '',
    waveNumber: ''
  })
  
  const [errors, setErrors] = useState<Record<string, string>>({})

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const updatePaymentData = (field: string, value: string) => {
    setPaymentData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateInfoForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.firstName.trim()) newErrors.firstName = 'Prénom requis'
    if (!formData.lastName.trim()) newErrors.lastName = 'Nom requis'
    if (!formData.email.trim()) newErrors.email = 'Email requis'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email invalide'
    if (!formData.phone.trim()) newErrors.phone = 'Téléphone requis'
    if (!formData.address.trim()) newErrors.address = 'Adresse requise'
    if (!formData.city.trim()) newErrors.city = 'Ville requise'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validatePaymentForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (paymentMethod === 'card') {
      if (!paymentData.cardNumber.trim()) newErrors.cardNumber = 'Numéro de carte requis'
      else if (!/^\d{16}$/.test(paymentData.cardNumber.replace(/\s/g, ''))) newErrors.cardNumber = 'Numéro invalide'
      if (!paymentData.cardExpiry.trim()) newErrors.cardExpiry = 'Date requise'
      if (!paymentData.cardCvv.trim()) newErrors.cardCvv = 'CVV requis'
      if (!paymentData.cardName.trim()) newErrors.cardName = 'Nom requis'
    } else if (paymentMethod === 'orange') {
      if (!paymentData.orangeNumber.trim()) newErrors.orangeNumber = 'Numéro Orange requis'
      else if (!/^(\+221|7)[0-9]{8}$/.test(paymentData.orangeNumber.replace(/\s/g, ''))) newErrors.orangeNumber = 'Numéro invalide'
    } else if (paymentMethod === 'wave') {
      if (!paymentData.waveNumber.trim()) newErrors.waveNumber = 'Numéro Wave requis'
      else if (!/^(\+221|7)[0-9]{8}$/.test(paymentData.waveNumber.replace(/\s/g, ''))) newErrors.waveNumber = 'Numéro invalide'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleContinueToPayment = () => {
    if (validateInfoForm()) {
      setStep('payment')
    }
  }

  const handlePlaceOrder = async () => {
    if (!validatePaymentForm()) return
    
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Generate order number
    const generatedOrderNumber = 'CRH-' + Date.now().toString(36).toUpperCase()
    setOrderNumber(generatedOrderNumber)
    setIsProcessing(false)
    setStep('success')
  }

  // Redirect if cart is empty
  if (items.length === 0 && step !== 'success') {
    return (
      <div className="min-h-screen bg-[#FDFCF0] dark:bg-[#1A1410] flex items-center justify-center">
        <Card className="bg-[#F5F3E1] dark:bg-[#2D2416] border border-[#D4AF37]/20 max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <ShoppingCart className="w-16 h-16 text-[#B8A88A]/40 mx-auto mb-4" />
            <h2 className="text-xl font-medium text-[#3D2914] dark:text-[#F5F0E8] mb-2">Votre panier est vide</h2>
            <p className="text-[#5C4330] dark:text-[#B8A88A] mb-6">Ajoutez des articles pour passer commande</p>
            <Button onClick={() => onNavigate('boutique')} className="bg-[#D4AF37] hover:bg-[#B8962F] text-[#1A1410] rounded-full">Parcourir la boutique</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-[#FDFCF0] dark:bg-[#1A1410] flex items-center justify-center p-4">
        <Card className="bg-[#F5F3E1] dark:bg-[#2D2416] border border-[#D4AF37]/20 max-w-lg w-full">
          <CardContent className="p-8">
            {/* Success Animation */}
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-[#81B29A]/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <CheckCircle className="w-10 h-10 text-[#81B29A]" />
              </div>
              <h1 className="text-2xl font-bold text-[#3D2914] dark:text-[#F5F0E8] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                Commande confirmée !
              </h1>
              <p className="text-[#5C4330] dark:text-[#B8A88A]">Merci pour votre achat, {formData.firstName} !</p>
            </div>
            
            {/* Order Details */}
            <div className="bg-[#FDFCF0] dark:bg-[#1A1410] rounded-xl p-4 mb-6 border border-[#E8E5D8] dark:border-[#D4AF37]/20">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-[#5C4330] dark:text-[#B8A88A]">Numéro de commande</span>
                <span className="font-bold text-[#D4AF37]">{orderNumber}</span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm text-[#5C4330] dark:text-[#B8A88A]">Email de confirmation</span>
                <span className="text-sm text-[#3D2914] dark:text-[#F5F0E8]">{formData.email}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#5C4330] dark:text-[#B8A88A]">Total payé</span>
                <span className="font-bold text-[#D4AF37] text-lg">{totalPrice.toFixed(2)}€</span>
              </div>
            </div>
            
            {/* Items Summary */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-[#3D2914] dark:text-[#F5F0E8] mb-2">Articles commandés :</h3>
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-[#5C4330] dark:text-[#B8A88A]">{item.title} x{item.quantity}</span>
                    <span className="text-[#3D2914] dark:text-[#F5F0E8]">{(item.price * item.quantity).toFixed(2)}€</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Actions */}
            <div className="space-y-3">
              <Button 
                onClick={() => { clearCart(); onNavigate('boutique') }} 
                className="w-full bg-[#D4AF37] hover:bg-[#B8962F] text-[#1A1410] rounded-xl py-6"
              >
                <ShoppingBag className="w-5 h-5 mr-2" /> Continuer mes achats
              </Button>
              <Button 
                variant="outline" 
                onClick={() => onNavigate('dashboard')} 
                className="w-full border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-xl"
              >
                Voir mes commandes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FDFCF0] dark:bg-[#1A1410]">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#FDFCF0]/95 dark:bg-[#1A1410]/95 backdrop-blur-sm border-b border-[#E8E5D8] dark:border-[#D4AF37]/20 px-4 lg:px-8 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Button variant="ghost" onClick={() => step === 'payment' ? setStep('info') : onNavigate('cart')} className="text-[#3D2914] dark:text-[#F5F0E8]">
            <ArrowRight className="w-4 h-4 mr-2 rotate-180" /> Retour
          </Button>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#81B29A]" />
            <span className="text-sm text-[#81B29A]">Paiement sécurisé</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className={`flex items-center gap-2 ${step === 'info' ? 'text-[#D4AF37]' : 'text-[#81B29A]'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step === 'info' ? 'bg-[#D4AF37] text-[#1A1410]' : 'bg-[#81B29A] text-white'}`}>
              {step === 'payment' ? <Check className="w-5 h-5" /> : '1'}
            </div>
            <span className="hidden sm:inline font-medium">Informations</span>
          </div>
          <div className="w-16 h-1 bg-[#D4AF37]/30 rounded">
            <div className={`h-full bg-[#D4AF37] rounded transition-all ${step === 'payment' ? 'w-full' : 'w-0'}`} />
          </div>
          <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-[#D4AF37]' : 'text-[#B8A88A]'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step === 'payment' ? 'bg-[#D4AF37] text-[#1A1410]' : 'bg-[#D4AF37]/20 text-[#D4AF37]'}`}>2</div>
            <span className="hidden sm:inline font-medium">Paiement</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-3">
            {step === 'info' && (
              <Card className="bg-[#F5F3E1] dark:bg-[#2D2416] border border-[#D4AF37]/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                      <User className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-[#3D2914] dark:text-[#F5F0E8]">Informations de livraison</h2>
                      <p className="text-sm text-[#5C4330] dark:text-[#B8A88A]">Vos coordonnées pour recevoir votre commande</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Name */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-[#5C4330] dark:text-[#B8A88A] mb-1 block">Prénom *</Label>
                        <Input 
                          value={formData.firstName}
                          onChange={(e) => updateFormData('firstName', e.target.value)}
                          placeholder="Votre prénom"
                          className={`bg-[#FDFCF0] dark:bg-[#1A1410] border-[#E8E5D8] dark:border-[#D4AF37]/20 ${errors.firstName ? 'border-red-500' : ''}`}
                        />
                        {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                      </div>
                      <div>
                        <Label className="text-[#5C4330] dark:text-[#B8A88A] mb-1 block">Nom *</Label>
                        <Input 
                          value={formData.lastName}
                          onChange={(e) => updateFormData('lastName', e.target.value)}
                          placeholder="Votre nom"
                          className={`bg-[#FDFCF0] dark:bg-[#1A1410] border-[#E8E5D8] dark:border-[#D4AF37]/20 ${errors.lastName ? 'border-red-500' : ''}`}
                        />
                        {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                      </div>
                    </div>
                    
                    {/* Contact */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-[#5C4330] dark:text-[#B8A88A] mb-1 block">Email *</Label>
                        <Input 
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateFormData('email', e.target.value)}
                          placeholder="votre@email.com"
                          className={`bg-[#FDFCF0] dark:bg-[#1A1410] border-[#E8E5D8] dark:border-[#D4AF37]/20 ${errors.email ? 'border-red-500' : ''}`}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <Label className="text-[#5C4330] dark:text-[#B8A88A] mb-1 block">Téléphone *</Label>
                        <Input 
                          value={formData.phone}
                          onChange={(e) => updateFormData('phone', e.target.value)}
                          placeholder="+221 77 123 45 67"
                          className={`bg-[#FDFCF0] dark:bg-[#1A1410] border-[#E8E5D8] dark:border-[#D4AF37]/20 ${errors.phone ? 'border-red-500' : ''}`}
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                      </div>
                    </div>
                    
                    {/* Address */}
                    <div>
                      <Label className="text-[#5C4330] dark:text-[#B8A88A] mb-1 block">Adresse *</Label>
                      <Input 
                        value={formData.address}
                        onChange={(e) => updateFormData('address', e.target.value)}
                        placeholder="Rue, numéro, quartier"
                        className={`bg-[#FDFCF0] dark:bg-[#1A1410] border-[#E8E5D8] dark:border-[#D4AF37]/20 ${errors.address ? 'border-red-500' : ''}`}
                      />
                      {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                    </div>
                    
                    {/* City & Postal */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-[#5C4330] dark:text-[#B8A88A] mb-1 block">Ville *</Label>
                        <Input 
                          value={formData.city}
                          onChange={(e) => updateFormData('city', e.target.value)}
                          placeholder="Dakar"
                          className={`bg-[#FDFCF0] dark:bg-[#1A1410] border-[#E8E5D8] dark:border-[#D4AF37]/20 ${errors.city ? 'border-red-500' : ''}`}
                        />
                        {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                      </div>
                      <div>
                        <Label className="text-[#5C4330] dark:text-[#B8A88A] mb-1 block">Code postal</Label>
                        <Input 
                          value={formData.postalCode}
                          onChange={(e) => updateFormData('postalCode', e.target.value)}
                          placeholder="10000"
                          className="bg-[#FDFCF0] dark:bg-[#1A1410] border-[#E8E5D8] dark:border-[#D4AF37]/20"
                        />
                      </div>
                    </div>
                    
                    {/* Country */}
                    <div>
                      <Label className="text-[#5C4330] dark:text-[#B8A88A] mb-1 block">Pays</Label>
                      <select 
                        value={formData.country}
                        onChange={(e) => updateFormData('country', e.target.value)}
                        className="w-full px-3 py-2 bg-[#FDFCF0] dark:bg-[#1A1410] border border-[#E8E5D8] dark:border-[#D4AF37]/20 rounded-lg text-[#3D2914] dark:text-[#F5F0E8]"
                      >
                        <option value="Sénégal">Sénégal</option>
                        <option value="France">France</option>
                        <option value="Côte d'Ivoire">Côte d'Ivoire</option>
                        <option value="Mali">Mali</option>
                        <option value="Burkina Faso">Burkina Faso</option>
                        <option value="Maroc">Maroc</option>
                        <option value="Tunisie">Tunisie</option>
                        <option value="Belgique">Belgique</option>
                        <option value="Suisse">Suisse</option>
                        <option value="Canada">Canada</option>
                      </select>
                    </div>
                    
                    {/* Notes */}
                    <div>
                      <Label className="text-[#5C4330] dark:text-[#B8A88A] mb-1 block">Notes (optionnel)</Label>
                      <textarea 
                        value={formData.notes}
                        onChange={(e) => updateFormData('notes', e.target.value)}
                        placeholder="Instructions spéciales pour la livraison..."
                        rows={3}
                        className="w-full px-3 py-2 bg-[#FDFCF0] dark:bg-[#1A1410] border border-[#E8E5D8] dark:border-[#D4AF37]/20 rounded-lg text-[#3D2914] dark:text-[#F5F0E8] resize-none"
                      />
                    </div>
                    
                    <Button 
                      onClick={handleContinueToPayment} 
                      className="w-full bg-[#D4AF37] hover:bg-[#B8962F] text-[#1A1410] rounded-xl py-6 text-lg font-semibold mt-4"
                    >
                      Continuer vers le paiement
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 'payment' && (
              <Card className="bg-[#F5F3E1] dark:bg-[#2D2416] border border-[#D4AF37]/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-[#3D2914] dark:text-[#F5F0E8]">Mode de paiement</h2>
                      <p className="text-sm text-[#5C4330] dark:text-[#B8A88A]">Choisissez votre méthode de paiement</p>
                    </div>
                  </div>
                  
                  {/* Payment Methods */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                        paymentMethod === 'card' 
                          ? 'border-[#D4AF37] bg-[#D4AF37]/10' 
                          : 'border-[#E8E5D8] dark:border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
                      }`}
                    >
                      <CreditCard className={`w-8 h-8 ${paymentMethod === 'card' ? 'text-[#D4AF37]' : 'text-[#B8A88A]'}`} />
                      <span className={`text-sm font-medium ${paymentMethod === 'card' ? 'text-[#D4AF37]' : 'text-[#5C4330] dark:text-[#B8A88A]'}`}>Carte</span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod('orange')}
                      className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                        paymentMethod === 'orange' 
                          ? 'border-[#FF6600] bg-[#FF6600]/10' 
                          : 'border-[#E8E5D8] dark:border-[#D4AF37]/20 hover:border-[#FF6600]/50'
                      }`}
                    >
                      <Smartphone className={`w-8 h-8 ${paymentMethod === 'orange' ? 'text-[#FF6600]' : 'text-[#B8A88A]'}`} />
                      <span className={`text-sm font-medium ${paymentMethod === 'orange' ? 'text-[#FF6600]' : 'text-[#5C4330] dark:text-[#B8A88A]'}`}>Orange</span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod('wave')}
                      className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                        paymentMethod === 'wave' 
                          ? 'border-[#1DC8F2] bg-[#1DC8F2]/10' 
                          : 'border-[#E8E5D8] dark:border-[#D4AF37]/20 hover:border-[#1DC8F2]/50'
                      }`}
                    >
                      <Smartphone className={`w-8 h-8 ${paymentMethod === 'wave' ? 'text-[#1DC8F2]' : 'text-[#B8A88A]'}`} />
                      <span className={`text-sm font-medium ${paymentMethod === 'wave' ? 'text-[#1DC8F2]' : 'text-[#5C4330] dark:text-[#B8A88A]'}`}>Wave</span>
                    </button>
                  </div>
                  
                  {/* Card Form */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-4">
                      <div>
                        <Label className="text-[#5C4330] dark:text-[#B8A88A] mb-1 block">Numéro de carte *</Label>
                        <Input 
                          value={paymentData.cardNumber}
                          onChange={(e) => updatePaymentData('cardNumber', e.target.value)}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          className={`bg-[#FDFCF0] dark:bg-[#1A1410] border-[#E8E5D8] dark:border-[#D4AF37]/20 ${errors.cardNumber ? 'border-red-500' : ''}`}
                        />
                        {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                      </div>
                      <div>
                        <Label className="text-[#5C4330] dark:text-[#B8A88A] mb-1 block">Nom sur la carte *</Label>
                        <Input 
                          value={paymentData.cardName}
                          onChange={(e) => updatePaymentData('cardName', e.target.value)}
                          placeholder="JEAN DUPONT"
                          className={`bg-[#FDFCF0] dark:bg-[#1A1410] border-[#E8E5D8] dark:border-[#D4AF37]/20 ${errors.cardName ? 'border-red-500' : ''}`}
                        />
                        {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-[#5C4330] dark:text-[#B8A88A] mb-1 block">Date d'expiration *</Label>
                          <Input 
                            value={paymentData.cardExpiry}
                            onChange={(e) => updatePaymentData('cardExpiry', e.target.value)}
                            placeholder="MM/AA"
                            maxLength={5}
                            className={`bg-[#FDFCF0] dark:bg-[#1A1410] border-[#E8E5D8] dark:border-[#D4AF37]/20 ${errors.cardExpiry ? 'border-red-500' : ''}`}
                          />
                          {errors.cardExpiry && <p className="text-red-500 text-xs mt-1">{errors.cardExpiry}</p>}
                        </div>
                        <div>
                          <Label className="text-[#5C4330] dark:text-[#B8A88A] mb-1 block">CVV *</Label>
                          <Input 
                            value={paymentData.cardCvv}
                            onChange={(e) => updatePaymentData('cardCvv', e.target.value)}
                            placeholder="123"
                            maxLength={4}
                            type="password"
                            className={`bg-[#FDFCF0] dark:bg-[#1A1410] border-[#E8E5D8] dark:border-[#D4AF37]/20 ${errors.cardCvv ? 'border-red-500' : ''}`}
                          />
                          {errors.cardCvv && <p className="text-red-500 text-xs mt-1">{errors.cardCvv}</p>}
                        </div>
                      </div>
                      
                      {/* Accepted Cards */}
                      <div className="flex items-center gap-4 pt-2">
                        <span className="text-xs text-[#B8A88A]">Cartes acceptées:</span>
                        <div className="flex gap-2">
                          <div className="px-2 py-1 bg-blue-600 text-white text-xs rounded">VISA</div>
                          <div className="px-2 py-1 bg-red-600 text-white text-xs rounded">Mastercard</div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Orange Money Form */}
                  {paymentMethod === 'orange' && (
                    <div className="space-y-4">
                      <div className="bg-[#FF6600]/10 border border-[#FF6600]/30 rounded-xl p-4 flex items-start gap-3">
                        <Smartphone className="w-6 h-6 text-[#FF6600] flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-[#3D2914] dark:text-[#F5F0E8]">Paiement Orange Money</p>
                          <p className="text-sm text-[#5C4330] dark:text-[#B8A88A]">Vous recevrez une demande de paiement sur votre téléphone</p>
                        </div>
                      </div>
                      <div>
                        <Label className="text-[#5C4330] dark:text-[#B8A88A] mb-1 block">Numéro Orange Money *</Label>
                        <Input 
                          value={paymentData.orangeNumber}
                          onChange={(e) => updatePaymentData('orangeNumber', e.target.value)}
                          placeholder="77 123 45 67"
                          className={`bg-[#FDFCF0] dark:bg-[#1A1410] border-[#E8E5D8] dark:border-[#D4AF37]/20 ${errors.orangeNumber ? 'border-red-500' : ''}`}
                        />
                        {errors.orangeNumber && <p className="text-red-500 text-xs mt-1">{errors.orangeNumber}</p>}
                      </div>
                    </div>
                  )}
                  
                  {/* Wave Form */}
                  {paymentMethod === 'wave' && (
                    <div className="space-y-4">
                      <div className="bg-[#1DC8F2]/10 border border-[#1DC8F2]/30 rounded-xl p-4 flex items-start gap-3">
                        <Smartphone className="w-6 h-6 text-[#1DC8F2] flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-[#3D2914] dark:text-[#F5F0E8]">Paiement Wave</p>
                          <p className="text-sm text-[#5C4330] dark:text-[#B8A88A]">Vous recevrez une demande de paiement Wave</p>
                        </div>
                      </div>
                      <div>
                        <Label className="text-[#5C4330] dark:text-[#B8A88A] mb-1 block">Numéro Wave *</Label>
                        <Input 
                          value={paymentData.waveNumber}
                          onChange={(e) => updatePaymentData('waveNumber', e.target.value)}
                          placeholder="77 123 45 67"
                          className={`bg-[#FDFCF0] dark:bg-[#1A1410] border-[#E8E5D8] dark:border-[#D4AF37]/20 ${errors.waveNumber ? 'border-red-500' : ''}`}
                        />
                        {errors.waveNumber && <p className="text-red-500 text-xs mt-1">{errors.waveNumber}</p>}
                      </div>
                    </div>
                  )}
                  
                  <Button 
                    onClick={handlePlaceOrder} 
                    disabled={isProcessing}
                    className="w-full bg-[#E07A5F] hover:bg-[#C96850] text-white rounded-xl py-6 text-lg font-semibold mt-6 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Traitement en cours...
                      </>
                    ) : (
                      <>
                        <Lock className="w-5 h-5 mr-2" />
                        Payer {totalPrice.toFixed(2)}€
                      </>
                    )}
                  </Button>
                  
                  {/* Security Note */}
                  <div className="flex items-center justify-center gap-2 mt-4 text-xs text-[#B8A88A]">
                    <Shield className="w-4 h-4" />
                    <span>Paiement 100% sécurisé • Vos données sont protégées</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-2">
            <Card className="bg-[#F5F3E1] dark:bg-[#2D2416] border border-[#D4AF37]/20 sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-[#3D2914] dark:text-[#F5F0E8] mb-4 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
                  Votre commande
                </h2>
                
                {/* Items */}
                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <img src={item.image} alt={item.title} className="w-16 h-16 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-[#3D2914] dark:text-[#F5F0E8] text-sm truncate">{item.title}</p>
                        <p className="text-xs text-[#81B29A]">par {item.creator}</p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs text-[#B8A88A]">Qté: {item.quantity}</span>
                          <span className="text-sm font-bold text-[#D4AF37]">{(item.price * item.quantity).toFixed(2)}€</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator className="bg-[#D4AF37]/20 my-4" />
                
                {/* Summary */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-[#5C4330] dark:text-[#B8A88A]">
                    <span>Sous-total</span>
                    <span>{totalPrice.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between text-[#5C4330] dark:text-[#B8A88A]">
                    <span>Livraison</span>
                    <span className="text-[#81B29A]">Gratuite</span>
                  </div>
                  <div className="flex justify-between text-[#5C4330] dark:text-[#B8A88A]">
                    <span>TVA</span>
                    <span>Incluse</span>
                  </div>
                </div>
                
                <Separator className="bg-[#D4AF37]/20 my-4" />
                
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#3D2914] dark:text-[#F5F0E8]">Total</span>
                  <span className="text-2xl font-bold text-[#D4AF37]">{totalPrice.toFixed(2)}€</span>
                </div>
                
                {/* Delivery Info */}
                {step === 'payment' && formData.firstName && (
                  <div className="mt-6 p-3 bg-[#FDFCF0] dark:bg-[#1A1410] rounded-lg border border-[#E8E5D8] dark:border-[#D4AF37]/20">
                    <p className="text-xs text-[#B8A88A] mb-1">Livraison à:</p>
                    <p className="text-sm text-[#3D2914] dark:text-[#F5F0E8] font-medium">{formData.firstName} {formData.lastName}</p>
                    <p className="text-xs text-[#5C4330] dark:text-[#B8A88A]">{formData.address}, {formData.city}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

// ============================================
// CREATOR PROFILE PAGE
// ============================================

function CreatorProfilePage({ creator, onNavigate }: { creator: typeof creators[0]; onNavigate: (view: ViewType) => void }) {
  const { products } = useProducts()
  const { addToCart } = useCart()
  const creatorProducts = products.filter(p => p.creatorId === creator.id || p.creator.includes(creator.name.split(' ')[0]))

  return (
    <div className="min-h-screen bg-[#FDFCF0] dark:bg-[#1A1410]">
      <header className="sticky top-0 z-30 bg-[#FDFCF0]/95 dark:bg-[#1A1410]/95 backdrop-blur-sm border-b border-[#E8E5D8] dark:border-[#D4AF37]/20 px-4 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Button variant="ghost" onClick={() => onNavigate('creators')} className="text-[#3D2914] dark:text-[#F5F0E8]">
            <ArrowRight className="w-4 h-4 mr-2 rotate-180" /> Retour
          </Button>
          <span className="text-[#B8A88A]">|</span>
          <span className="text-[#D4AF37] font-medium">Profil Créateur</span>
        </div>
      </header>

      {/* Cover & Profile */}
      <div className="relative">
        <div className="h-48 md:h-64 bg-gradient-to-r from-[#E07A5F] via-[#D4AF37] to-[#81B29A]" />
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="relative -mt-20 md:-mt-24 flex flex-col md:flex-row md:items-end gap-4 md:gap-6">
            <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-[#FDFCF0] dark:border-[#1A1410] shadow-xl">
              <AvatarImage src={creator.avatar} alt={creator.name} />
              <AvatarFallback className="bg-[#D4AF37] text-[#1A1410] text-3xl">{creator.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 pb-4">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl md:text-3xl font-bold text-[#3D2914] dark:text-[#F5F0E8]" style={{ fontFamily: 'Playfair Display, serif' }}>{creator.name}</h1>
                <Badge className="bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30"><Crown className="w-3 h-3 mr-1" /> Créateur Vérifié</Badge>
              </div>
              <p className="text-[#81B29A] font-medium mb-2">{creator.specialty}</p>
              <div className="flex items-center gap-4 text-[#5C4330] dark:text-[#B8A88A] text-sm">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {creator.location}</span>
                <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {creator.followers} abonnés</span>
                <span className="flex items-center gap-1"><FolderOpen className="w-4 h-4" /> {creator.projects} projets</span>
              </div>
            </div>
            <div className="flex gap-2 pb-4">
              <Button className="bg-[#E07A5F] hover:bg-[#C96850] text-white rounded-full"><UserPlus className="w-4 h-4 mr-2" /> Suivre</Button>
              <Button variant="outline" className="border-[#D4AF37]/30 text-[#D4AF37] rounded-full"><MessageSquare className="w-4 h-4 mr-2" /> Message</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <Card className="bg-[#F5F3E1] dark:bg-[#2D2416] border border-[#E8E5D8] dark:border-[#D4AF37]/20">
              <CardContent className="p-6">
                <h3 className="font-semibold text-[#3D2914] dark:text-[#F5F0E8] mb-3">À propos</h3>
                <p className="text-[#5C4330] dark:text-[#B8A88A] leading-relaxed">{creator.bio}</p>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" className="border-[#E07A5F]/30 text-[#E07A5F]"><Instagram className="w-4 h-4" /></Button>
                  <Button variant="outline" size="sm" className="border-[#81B29A]/30 text-[#81B29A]"><Facebook className="w-4 h-4" /></Button>
                  <Button variant="outline" size="sm" className="border-[#D4AF37]/30 text-[#D4AF37]"><Globe className="w-4 h-4" /></Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#F5F3E1] dark:bg-[#2D2416] border border-[#E8E5D8] dark:border-[#D4AF37]/20">
              <CardContent className="p-6">
                <h3 className="font-semibold text-[#3D2914] dark:text-[#F5F0E8] mb-4">Statistiques</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-[#FDFCF0] dark:bg-[#1A1410] rounded-xl">
                    <p className="text-2xl font-bold text-[#D4AF37]">{creator.projects}</p>
                    <p className="text-xs text-[#5C4330] dark:text-[#B8A88A]">Projets</p>
                  </div>
                  <div className="text-center p-3 bg-[#FDFCF0] dark:bg-[#1A1410] rounded-xl">
                    <p className="text-2xl font-bold text-[#E07A5F]">{creator.followers}</p>
                    <p className="text-xs text-[#5C4330] dark:text-[#B8A88A]">Abonnés</p>
                  </div>
                  <div className="text-center p-3 bg-[#FDFCF0] dark:bg-[#1A1410] rounded-xl">
                    <p className="text-2xl font-bold text-[#81B29A]">{creatorProducts.length}</p>
                    <p className="text-xs text-[#5C4330] dark:text-[#B8A88A]">Produits</p>
                  </div>
                  <div className="text-center p-3 bg-[#FDFCF0] dark:bg-[#1A1410] rounded-xl">
                    <p className="text-2xl font-bold text-[#C96850]">4.9</p>
                    <p className="text-xs text-[#5C4330] dark:text-[#B8A88A]">Note</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Products */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-[#3D2914] dark:text-[#F5F0E8] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>Ses créations</h2>
            {creatorProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {creatorProducts.map((product) => (
                  <Card key={product.id} className="group bg-[#F5F3E1] dark:bg-[#2D2416] border border-[#E8E5D8] dark:border-[#D4AF37]/20 overflow-hidden hover:border-[#D4AF37]/40 transition-all">
                    <div className="aspect-square relative overflow-hidden bg-[#E8E5D8]/30 dark:bg-[#1A1410]">
                      <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <Badge className="absolute top-2 left-2 bg-[#D4AF37]/90 text-[#1A1410] text-xs">{product.category}</Badge>
                    </div>
                    <CardContent className="p-3">
                      <h3 className="font-medium text-[#3D2914] dark:text-[#F5F0E8] text-sm truncate">{product.title}</h3>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-sm font-bold text-[#D4AF37]">{product.price.toFixed(2)}€</p>
                        <Button size="sm" onClick={() => addToCart(product)} className="bg-[#E07A5F] hover:bg-[#C96850] text-white rounded-full text-xs px-2"><ShoppingCart className="w-3 h-3 mr-1" /> Ajouter</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-[#F5F3E1] dark:bg-[#2D2416] rounded-xl border border-[#D4AF37]/20">
                <Package className="w-16 h-16 text-[#B8A88A]/40 mx-auto mb-4" />
                <p className="text-[#5C4330] dark:text-[#B8A88A]">Aucun produit disponible</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="bg-gradient-to-r from-[#3D2914] via-[#2D2416] to-[#3D2914] text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center">
          <p className="text-white/60 text-sm">© 2024 Crochetti - Tous droits réservés</p>
        </div>
      </footer>
    </div>
  )
}

// ============================================
// MAIN APP COMPONENT
// ============================================

export default function CrochettiApp() {
  const [view, setView] = useState<ViewType>('landing')
  const [theme, setTheme] = useState<Theme>('light')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [selectedCreator, setSelectedCreator] = useState<typeof creators[0] | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  // Products context functions
  const addProduct = (productData: Omit<Product, 'id' | 'rating' | 'reviews' | 'createdAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: Math.max(...products.map(p => p.id)) + 1,
      rating: 0,
      reviews: 0,
      createdAt: new Date().toISOString().split('T')[0]
    }
    setProducts(prev => [newProduct, ...prev])
  }

  const updateProduct = (id: number, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p))
  }

  const deleteProduct = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  // Cart context functions
  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      }
      return [...prev, { id: product.id, title: product.title, image: product.image, price: product.price, creator: product.creator, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId: number, quantity: number) => {
    setCartItems(prev => prev.map(item => item.id === productId ? { ...item, quantity } : item))
  }

  const clearCart = () => setCartItems([])

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const cartContextValue = { items: cartItems, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }

  // Landing page is rendered standalone without sidebar
  if (view === 'landing') {
    return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ProductsContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
          <CartContext.Provider value={cartContextValue}>
            <LuxuryLandingPage onNavigate={setView} products={products} />
            <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} onNavigate={setView} />
          </CartContext.Provider>
        </ProductsContext.Provider>
      </ThemeContext.Provider>
    )
  }

  // Creators page
  if (view === 'creators') {
    return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ProductsContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
          <CartContext.Provider value={cartContextValue}>
            <CreatorsPage
              onNavigate={setView}
              onSelectCreator={(creator) => { setSelectedCreator(creator); setView('creator-profile') }}
            />
            <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} onNavigate={setView} />
          </CartContext.Provider>
        </ProductsContext.Provider>
      </ThemeContext.Provider>
    )
  }

  // Boutique page
  if (view === 'boutique') {
    return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ProductsContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
          <CartContext.Provider value={cartContextValue}>
            <PublicBoutiquePage
              onNavigate={setView}
              onSelectProduct={(product) => { setSelectedProduct(product); setView('product') }}
            />
            <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} onNavigate={setView} />
          </CartContext.Provider>
        </ProductsContext.Provider>
      </ThemeContext.Provider>
    )
  }

  // Product detail page
  if (view === 'product' && selectedProduct) {
    return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ProductsContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
          <CartContext.Provider value={cartContextValue}>
            <ProductDetailPage
              product={selectedProduct}
              onNavigate={setView}
              onSelectCreator={(creator) => { setSelectedCreator(creator); setView('creator-profile') }}
            />
            <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} onNavigate={setView} />
          </CartContext.Provider>
        </ProductsContext.Provider>
      </ThemeContext.Provider>
    )
  }

  // Cart page
  if (view === 'cart') {
    return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ProductsContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
          <CartContext.Provider value={cartContextValue}>
            <CartPage onNavigate={setView} />
          </CartContext.Provider>
        </ProductsContext.Provider>
      </ThemeContext.Provider>
    )
  }

  // Checkout page
  if (view === 'checkout') {
    return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ProductsContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
          <CartContext.Provider value={cartContextValue}>
            <CheckoutPage onNavigate={setView} />
          </CartContext.Provider>
        </ProductsContext.Provider>
      </ThemeContext.Provider>
    )
  }

  // Creator profile page
  if (view === 'creator-profile' && selectedCreator) {
    return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ProductsContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
          <CartContext.Provider value={cartContextValue}>
            <CreatorProfilePage creator={selectedCreator} onNavigate={setView} />
          </CartContext.Provider>
        </ProductsContext.Provider>
      </ThemeContext.Provider>
    )
  }

  // Redirect SuperAdmin views to dedicated /superadmin page
  const superAdminViews: ViewType[] = ['superadmin', 'admin-users', 'admin-content', 'admin-analytics', 'admin-revenue', 'admin-settings']
  const isSuperAdminView = superAdminViews.includes(view)

  // Auto-redirect to dedicated SuperAdmin page
  if (isSuperAdminView) {
    if (typeof window !== 'undefined') {
      window.location.href = '/superadmin'
    }
    return null
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ProductsContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
        <CartContext.Provider value={cartContextValue}>
          <div className="min-h-screen bg-[#FDFCF0] dark:bg-[#1A1410] flex">
            <Sidebar
              currentView={view}
              onNavigate={setView}
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />

            <ThemeContext.Provider value={{ theme, toggleTheme }}>
              {view === 'dashboard' && <DashboardPage onNavigate={setView} onOpenSidebar={() => setSidebarOpen(true)} />}
              {view === 'messages' && <MessagesPage onOpenSidebar={() => setSidebarOpen(true)} />}
              {view === 'comments' && <CommentsPage onOpenSidebar={() => setSidebarOpen(true)} />}
              {view === 'analytics' && <AnalyticsPage onOpenSidebar={() => setSidebarOpen(true)} />}
              {view === 'shop-manage' && <ShopManagementPage onOpenSidebar={() => setSidebarOpen(true)} />}
              {view === 'planner' && <PlannerPage onOpenSidebar={() => setSidebarOpen(true)} />}
              {view === 'subscribers' && <SubscribersPage onOpenSidebar={() => setSidebarOpen(true)} />}
              {view === 'new-project' && <NewProjectPage onNavigate={setView} onOpenSidebar={() => setSidebarOpen(true)} />}
              {view === 'explorer' && <DashboardPage onNavigate={setView} onOpenSidebar={() => setSidebarOpen(true)} />}
              {view === 'profile' && <DashboardPage onNavigate={setView} onOpenSidebar={() => setSidebarOpen(true)} />}
            </ThemeContext.Provider>
          </div>
          <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} onNavigate={setView} />
        </CartContext.Provider>
      </ProductsContext.Provider>
    </ThemeContext.Provider>
  )
}
