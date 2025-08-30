import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export function useArticleViews(articleId: string) {
  const [views, setViews] = useState(0)

  useEffect(() => {
    const trackView = async () => {
      const viewKey = `article-viewed-${articleId}`
      const hasViewed = localStorage.getItem(viewKey)

      const { data: viewData } = await supabase
        .from('article_views')
        .select('views')
        .eq('article_id', articleId)
        .single()

      if (viewData) {
        setViews(viewData.views)
      }

      if (!hasViewed) {
        const newViews = (viewData?.views || 0) + 1

        const { error } = await supabase.from('article_views').upsert(
          {
            article_id: articleId,
            views: newViews
          },
          {
            onConflict: 'article_id'
          }
        )

        if (!error) {
          setViews(newViews)
          localStorage.setItem(viewKey, 'true')
        }
      }
    }

    trackView()
  }, [articleId])

  return views
}
