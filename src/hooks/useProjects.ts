import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { projectsData, ProjectDetail } from '../components/CaseStudyModal';

export function useProjects() {
  const [projects, setProjects] = useState<Record<string, ProjectDetail>>(projectsData);
  const [loading, setLoading] = useState<boolean>(isSupabaseConfigured);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    async function fetchProjects() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('projects')
          .select('*');

        if (error) {
          console.warn('Supabase fetch error, falling back to local dataset:', error.message);
          setError(error.message);
          return;
        }

        if (data && data.length > 0) {
          const map: Record<string, ProjectDetail> = {};
          data.forEach((item: any) => {
            map[item.id] = {
              id: item.id,
              title: item.title,
              subtitle: item.subtitle,
              role: item.role,
              year: item.year,
              tags: item.tags || [],
              description: item.description,
              heroImage: item.hero_image || item.heroImage,
              highlights: item.highlights || [],
              screens: item.screens || [],
              illustrations: item.illustrations || [],
              videoSrc: item.video_src || item.videoSrc,
            };
          });
          setProjects(map);
        }
      } catch (err: any) {
        console.warn('Supabase request failed, using local dataset fallback:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return { projects, loading, error, isLiveDatabase: isSupabaseConfigured && !error };
}
