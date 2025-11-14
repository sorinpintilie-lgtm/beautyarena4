/**
 * Category Icons Mapping
 * Maps category names to Lucide React icons for visual recognition
 */

import {
  Star,
  Sparkles,
  Droplets,
  Wind,
  Sun,
  Scissors,
  Palette,
  Heart,
  Gift,
  Users,
  Zap,
  Shield,
  Leaf,
  Flame,
  Package,
  ShoppingBag,
  Sprout
} from 'lucide-react';

/**
 * Category icon mapping
 * Keys are lowercase patterns to match against category names
 */
export const categoryIcons = {
  // Premium & Brands
  'branduri premium': Star,
  'brand': Star,
  'medavita': Sparkles,
  
  // Scalp Treatments
  'tratamente scalp': Zap,
  'scalp': Zap,
  'anticadere': Shield,
  'antimatreata': Leaf,
  'antisebum': Droplets,
  'detox': Flame,
  'psoriazis': Shield,
  'calmant': Heart,
  
  // Hair Care
  'produse ingrijire par': Scissors,
  'ingrijire': Scissors,
  'par': Scissors,
  'hair': Scissors,
  
  // Treatments
  'tratamente lungimi': Sparkles,
  'lungimi': Sparkles,
  'hidratare': Droplets,
  'reconstructie': Shield,
  'reparare': Shield,
  'stralucire': Star,
  'volum': Wind,
  'keratina': Shield,
  
  // Product Types
  'sampon': Droplets,
  'shampoo': Droplets,
  'masca': Palette,
  'mask': Palette,
  'balsam': Droplets,
  'conditioner': Droplets,
  'spray': Sprout,
  'spuma': Wind,
  'mousse': Wind,
  'ulei': Droplets,
  'oil': Droplets,
  'ser': Sparkles,
  'serum': Sparkles,
  'crema': Palette,
  'cream': Palette,
  
  // Styling
  'styling': Wind,
  'finish': Wind,
  'fixare': Wind,
  
  // Special Categories
  'protectie solara': Sun,
  'solar': Sun,
  'solarich': Sun,
  'vopsea': Palette,
  'nuantatoare': Palette,
  'pigment': Palette,
  'blond': Star,
  'blondie': Star,
  
  // Men's Products
  'barbati': Users,
  'men': Users,
  'idol man': Users,
  
  // Gifts & Sets
  'cadou': Gift,
  'gift': Gift,
  'kit': Package,
  'set': Package,
  'duo': Package,
  
  // Leave-in & Special
  'fara clatire': Sparkles,
  'leave-in': Sparkles,
  'presampon': Droplets,
  'scrub': Leaf,
  
  // Default
  'default': ShoppingBag
};

/**
 * Get icon component for a category name
 * @param {string} categoryName - The category name to match
 * @returns {React.Component} - Lucide icon component
 */
export function getCategoryIcon(categoryName) {
  if (!categoryName) return categoryIcons.default;
  
  const nameLower = categoryName.toLowerCase();
  
  // Try to find a matching pattern
  for (const [pattern, Icon] of Object.entries(categoryIcons)) {
    if (pattern === 'default') continue;
    if (nameLower.includes(pattern)) {
      return Icon;
    }
  }
  
  return categoryIcons.default;
}

/**
 * Get icon component with props - removed JSX from utility file
 * Use getCategoryIcon() instead and render the icon in your component
 */

export default {
  categoryIcons,
  getCategoryIcon
};