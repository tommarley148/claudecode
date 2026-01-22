import { WidgetType } from '@/types'

export interface WidgetDefinition {
  type: WidgetType
  name: string
  description: string
  icon: string
  category: 'content' | 'engagement' | 'information'
  defaultSettings: Record<string, any>
  requiresApiKey?: boolean
}

export const widgetRegistry: Record<WidgetType, WidgetDefinition> = {
  'upcoming-events': {
    type: 'upcoming-events',
    name: 'Upcoming Events',
    description: 'Display upcoming matches, training sessions, and social events',
    icon: 'Calendar',
    category: 'content',
    defaultSettings: {
      maxEvents: 5,
      showPastEvents: false,
      viewMode: 'list',
    },
  },
  'youtube-videos': {
    type: 'youtube-videos',
    name: 'YouTube Videos',
    description: 'Embed and display latest videos from your YouTube channel',
    icon: 'Youtube',
    category: 'content',
    defaultSettings: {
      maxVideos: 3,
      autoplay: false,
    },
    requiresApiKey: true,
  },
  'tiktok-videos': {
    type: 'tiktok-videos',
    name: 'TikTok Videos',
    description: 'Showcase your latest TikTok videos',
    icon: 'Video',
    category: 'content',
    defaultSettings: {
      maxVideos: 3,
    },
  },
  'teams': {
    type: 'teams',
    name: 'Teams',
    description: 'Display club teams with rosters and recent results',
    icon: 'Users',
    category: 'information',
    defaultSettings: {
      showRoster: true,
      showRecentResults: true,
      expandByDefault: false,
    },
  },
  'join-form': {
    type: 'join-form',
    name: 'Join Club Form',
    description: 'Allow visitors to express interest or join your club',
    icon: 'UserPlus',
    category: 'engagement',
    defaultSettings: {
      formFields: [
        { name: 'name', label: 'Full Name', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'phone', label: 'Phone Number', type: 'tel', required: false },
        { name: 'ageGroup', label: 'Age Group', type: 'select', required: true, options: ['U9', 'U11', 'U13', 'U15', 'U17', 'U19', 'Adult', 'Senior'] },
        { name: 'message', label: 'Tell us about yourself', type: 'textarea', required: false },
      ],
      submitUrl: '/api/join-requests',
      successMessage: 'Thank you for your interest! We will be in touch soon.',
    },
  },
  'maps': {
    type: 'maps',
    name: 'Location Map',
    description: 'Show your venue location with directions',
    icon: 'MapPin',
    category: 'information',
    defaultSettings: {
      defaultZoom: 15,
      showDirections: true,
      mapStyle: 'roadmap',
    },
  },
  'amenities': {
    type: 'amenities',
    name: 'Amenities',
    description: 'Showcase your club facilities and amenities',
    icon: 'Building',
    category: 'information',
    defaultSettings: {
      displayMode: 'grid',
      showIcons: true,
      showDescriptions: true,
    },
  },
  'reviews': {
    type: 'reviews',
    name: 'Reviews & Ratings',
    description: 'Display member reviews and ratings',
    icon: 'Star',
    category: 'engagement',
    defaultSettings: {
      maxReviews: 10,
      sortBy: 'recent',
      allowSubmission: true,
    },
  },
  'custom-html': {
    type: 'custom-html',
    name: 'Custom HTML',
    description: 'Add custom HTML content (advanced)',
    icon: 'Code',
    category: 'content',
    defaultSettings: {
      html: '',
    },
  },
}

export const getWidgetDefinition = (type: WidgetType): WidgetDefinition | undefined => {
  return widgetRegistry[type]
}

export const getWidgetsByCategory = (category: WidgetDefinition['category']): WidgetDefinition[] => {
  return Object.values(widgetRegistry).filter((widget) => widget.category === category)
}

export const getAllWidgets = (): WidgetDefinition[] => {
  return Object.values(widgetRegistry)
}
