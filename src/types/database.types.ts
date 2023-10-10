export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      carts: {
        Row: {
          created_at: string
          id: number
          product_id: number
          quantity: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          product_id: number
          quantity: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          product_id?: number
          quantity?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "carts_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "carts_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "carts_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      products: {
        Row: {
          brand: string
          created_at: string
          description: string
          id: number
          image_url: string | null
          price: number
          title: string
        }
        Insert: {
          brand: string
          created_at?: string
          description: string
          id?: number
          image_url?: string | null
          price: number
          title: string
        }
        Update: {
          brand?: string
          created_at?: string
          description?: string
          id?: number
          image_url?: string | null
          price?: number
          title?: string
        }
        Relationships: []
      }
      ratings: {
        Row: {
          created_at: string
          id: number
          product_id: number
          text: string | null
          user_id: string
          value: number
        }
        Insert: {
          created_at?: string
          id?: number
          product_id: number
          text?: string | null
          user_id: string
          value: number
        }
        Update: {
          created_at?: string
          id?: number
          product_id?: number
          text?: string | null
          user_id?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "ratings_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ratings_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ratings_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      products_view: {
        Row: {
          brand: string | null
          created_at: string | null
          description: string | null
          id: number | null
          image_url: string | null
          price: number | null
          rating_avg: number | null
          rating_count: number | null
          title: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
