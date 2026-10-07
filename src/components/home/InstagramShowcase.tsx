import React, { useState } from 'react';
import { Instagram, Heart, MessageCircle, ExternalLink, Sparkles, X, ChevronLeft, ChevronRight, Bookmark, Share2 } from 'lucide-react';
import { HOTEL_INFO, INSTAGRAM_POSTS, INSTAGRAM_STORIES } from '../../data/hotelData';
import { InstagramStory, InstagramPost } from '../../types/hotel';
import { LuxuryImage } from '../ui/LuxuryImage';
import { EkaatraLogo } from '../ui/EkaatraLogo';

export const InstagramShowcase: React.FC = () => {
  const [activeStory, setActiveStory] = useState<InstagramStory | null>(null);
  const [activePost, setActivePost] = useState<InstagramPost | null>(null);
  const [storyIndex, setStoryIndex] = useState<number>(0);

  const handleOpenStory = (index: number) => {
    setStoryIndex(index);
    setActiveStory(INSTAGRAM_STORIES[index]);
  };

  const handleNextStory = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIdx = (storyIndex + 1) % INSTAGRAM_STORIES.length;
    setStoryIndex(nextIdx);
    setActiveStory(INSTAGRAM_STORIES[nextIdx]);
  };

  const handlePrevStory = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevIdx = (storyIndex - 1 + INSTAGRAM_STORIES.length) % INSTAGRAM_STORIES.length;
    setStoryIndex(prevIdx);
    setActiveStory(INSTAGRAM_STORIES[prevIdx]);
  };

  return (
    <section id="social" className="py-24 sm:py-32 bg-[#FAF8F5] border-t border-[#ECE7DE] relative overflow-hidden">
      {/* Background Subtle Sand Motif */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F5F2EA] rounded-full blur-3xl opacity-50 pointer-events-none -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F5F2EA] rounded-full blur-3xl opacity-50 pointer-events-none -ml-32 -mb-32" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#B89355] font-medium">
              <Instagram className="w-3.5 h-3.5 text-[#B89355]" />
              <span>Official Instagram · @ekaatrabypem</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1C1917] font-normal tracking-tight">
              Dispatches from Kukas
            </h2>
            <p className="text-sm text-[#78716C] font-light leading-relaxed">
              Follow our daily rhythm — golden hour shadows across limestone arches, handcrafted teakwood suites, and intimate celebratory moments under the desert sky.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <a
              href={HOTEL_INFO.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#1C1917] text-[#FAF8F5] hover:bg-[#B89355] hover:text-white transition-all duration-300 text-xs uppercase tracking-[0.2em] font-medium shadow-sm group"
            >
              <Instagram className="w-4 h-4 text-[#D9AA82] group-hover:text-white transition-colors" />
              <span>Follow @ekaatrabypem</span>
              <ExternalLink className="w-3 h-3 text-[#A8A29E] group-hover:text-white transition-colors" />
            </a>
          </div>
        </div>

        {/* Story Highlights Reel */}
        <div className="mb-14 pb-4 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-6 sm:gap-8 min-w-max px-1">
            {INSTAGRAM_STORIES.map((story, idx) => (
              <button
                key={story.id}
                onClick={() => handleOpenStory(idx)}
                className="group flex flex-col items-center gap-2.5 focus:outline-none text-center cursor-pointer transition-transform duration-200 hover:-translate-y-0.5"
              >
                <div className="relative p-[2.5px] rounded-full bg-gradient-to-tr from-[#B89355] via-[#D9AA82] to-[#E5C158] shadow-sm group-hover:scale-105 transition-transform duration-300">
                  <div className="p-[2px] bg-[#FAF8F5] rounded-full">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-[#ECE7DE]">
                      <LuxuryImage
                        id={story.imageKey}
                        alt={story.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  {story.badge && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#1C1917] text-[#FAF8F5] text-[9px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full border border-[#D9AA82]/40 whitespace-nowrap">
                      {story.badge}
                    </span>
                  )}
                </div>
                <span className="text-xs font-serif font-normal text-[#1C1917] tracking-wide group-hover:text-[#B89355] transition-colors max-w-[80px] sm:max-w-[90px] truncate">
                  {story.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Curated Instagram Grid (The 4 Real Property Moments) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {INSTAGRAM_POSTS.map((post) => (
            <div
              key={post.id}
              className="group bg-[#FAF8F5] border border-[#ECE7DE] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Post Header */}
              <div className="px-4 py-3 flex items-center justify-between border-b border-[#ECE7DE]/60 bg-[#FAF8F5]">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full overflow-hidden border border-[#D9AA82]/50 p-0.5 bg-[#FAF8F5]">
                    <EkaatraLogo theme="dark" size="sm" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-[#1C1917] block leading-tight">
                      ekaatrabypem
                    </span>
                    <span className="text-[10px] text-[#78716C] font-light">
                      Kukas, Jaipur
                    </span>
                  </div>
                </div>

                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#78716C] hover:text-[#B89355] transition-colors p-1"
                  aria-label="View on Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>

              {/* Photo Container with Hover Details */}
              <div
                className="relative aspect-square overflow-hidden bg-[#ECE7DE] cursor-pointer"
                onClick={() => setActivePost(post)}
              >
                <LuxuryImage
                  id={post.imageKey}
                  alt={post.caption}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4 text-white p-6 text-center">
                  <div className="flex items-center gap-6 text-sm font-medium">
                    <span className="flex items-center gap-1.5">
                      <Heart className="w-4 h-4 fill-white text-white" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MessageCircle className="w-4 h-4 fill-white text-white" />
                      {post.comments}
                    </span>
                  </div>
                  <p className="text-xs text-stone-200 line-clamp-3 font-light max-w-xs">
                    {post.caption}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-widest text-[#D9AA82] font-medium pt-1">
                    <span>View Post</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>

              {/* Post Footer & Caption */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-[#FAF8F5]">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-[#78716C]">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 text-[#1C1917] font-medium">
                        <Heart className="w-3.5 h-3.5 text-[#B89355]" />
                        {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3.5 h-3.5" />
                        {post.comments}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#A8A29E]">{post.timestamp}</span>
                  </div>

                  <p className="text-xs text-[#44403C] line-clamp-2 font-light leading-relaxed">
                    <span className="font-medium text-[#1C1917] mr-1.5">ekaatrabypem</span>
                    {post.caption}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#ECE7DE]/50 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-[10px] text-[#B89355] font-light">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-[#78716C] hover:text-[#1C1917] font-medium transition-colors"
                  >
                    <span>Instagram</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tag & Connect Callout */}
        <div className="mt-14 p-6 sm:p-8 bg-[#F5F2EA] border border-[#DFD7C8] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-serif text-xl sm:text-2xl text-[#1C1917] font-normal">
              Tag Your Solitude with #EkaatraByPEM
            </h3>
            <p className="text-xs sm:text-sm text-[#78716C] font-light">
              Share your photographs from Kukas, Rajasthan. Selected captures are featured weekly on our journal and stories.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={HOTEL_INFO.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1C1917] text-[#FAF8F5] hover:bg-[#B89355] hover:text-white transition-all text-xs uppercase tracking-[0.18em] font-medium"
            >
              <Instagram className="w-3.5 h-3.5 text-[#D9AA82]" />
              <span>Visit @ekaatrabypem</span>
            </a>
          </div>
        </div>
      </div>

      {/* Interactive Story Viewer Modal */}
      {activeStory && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveStory(null)}
          role="dialog"
          aria-modal="true"
        >
          {/* Close */}
          <button
            onClick={() => setActiveStory(null)}
            className="absolute top-6 right-6 p-2 text-white/70 hover:text-white transition-colors focus:outline-none"
            aria-label="Close story"
          >
            <X className="w-7 h-7" />
          </button>

          {/* Navigation */}
          <button
            onClick={handlePrevStory}
            className="hidden sm:block absolute left-4 md:left-8 p-3 text-white/70 hover:text-white transition-colors"
            aria-label="Previous story"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Story Card */}
          <div
            className="relative max-w-sm w-full aspect-[9/16] rounded-xl overflow-hidden shadow-2xl bg-black border border-stone-800 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background Story Image */}
            <div className="absolute inset-0 z-0">
              <LuxuryImage
                id={activeStory.imageKey}
                alt={activeStory.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/60" />
            </div>

            {/* Story Top Progress & Profile */}
            <div className="relative z-10 p-4 space-y-3">
              {/* Progress bars */}
              <div className="flex gap-1.5">
                {INSTAGRAM_STORIES.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                      i === storyIndex ? 'bg-white' : i < storyIndex ? 'bg-white/60' : 'bg-white/25'
                    }`}
                  />
                ))}
              </div>

              {/* Account info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full border border-[#D9AA82] overflow-hidden bg-[#1C1917] p-0.5">
                    <EkaatraLogo theme="light" size="sm" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-white block">
                      ekaatrabypem
                    </span>
                    <span className="text-[10px] text-stone-300">
                      {activeStory.title}
                    </span>
                  </div>
                </div>

                <a
                  href={HOTEL_INFO.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-full bg-white/20 hover:bg-white/40 text-white text-[10px] uppercase tracking-wider font-medium backdrop-blur-sm transition-colors"
                >
                  Follow
                </a>
              </div>
            </div>

            {/* Story Bottom Caption & CTA */}
            <div className="relative z-10 p-5 space-y-3">
              <p className="text-xs text-white/95 font-light leading-relaxed">
                {activeStory.description}
              </p>

              <div className="pt-2 flex items-center justify-between gap-3">
                <a
                  href={HOTEL_INFO.contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 bg-white text-[#1C1917] hover:bg-[#B89355] hover:text-white transition-colors text-center text-[11px] uppercase tracking-widest font-medium rounded-sm flex items-center justify-center gap-1.5"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>View on Instagram</span>
                </a>
                <button
                  onClick={() => setActiveStory(null)}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-sm text-white transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleNextStory}
            className="hidden sm:block absolute right-4 md:right-8 p-3 text-white/70 hover:text-white transition-colors"
            aria-label="Next story"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      )}

      {/* Post Detail Lightbox Modal */}
      {activePost && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setActivePost(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() => setActivePost(null)}
            className="absolute top-6 right-6 p-2 text-white/70 hover:text-white transition-colors focus:outline-none"
            aria-label="Close post"
          >
            <X className="w-7 h-7" />
          </button>

          <div
            className="max-w-4xl w-full bg-[#FAF8F5] rounded-xs overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image side */}
            <div className="md:w-3/5 bg-black flex items-center justify-center overflow-hidden">
              <div className="w-full aspect-square md:aspect-auto md:h-full">
                <LuxuryImage
                  id={activePost.imageKey}
                  alt={activePost.caption}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Info side */}
            <div className="md:w-2/5 p-6 flex flex-col justify-between space-y-4 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#ECE7DE]">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full overflow-hidden border border-[#D9AA82] p-0.5 bg-[#FAF8F5]">
                      <EkaatraLogo theme="dark" size="sm" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-[#1C1917]">
                        ekaatrabypem
                      </h4>
                      <p className="text-[11px] text-[#78716C]">
                        Kukas, Rajasthan
                      </p>
                    </div>
                  </div>

                  <a
                    href={activePost.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 text-[#B89355] hover:text-[#1C1917] transition-colors"
                    title="Open on Instagram"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <div className="space-y-3">
                  <p className="text-xs text-[#44403C] font-light leading-relaxed">
                    {activePost.caption}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {activePost.tags.map((tag) => (
                      <span key={tag} className="text-[11px] text-[#B89355]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#ECE7DE] space-y-3">
                <div className="flex items-center justify-between text-xs text-[#78716C]">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-[#1C1917] font-medium">
                      <Heart className="w-4 h-4 text-[#B89355] fill-[#B89355]" />
                      {activePost.likes} likes
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      {activePost.comments}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#A8A29E]">{activePost.timestamp}</span>
                </div>

                <a
                  href={activePost.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-[#1C1917] text-[#FAF8F5] hover:bg-[#B89355] transition-colors text-center text-xs uppercase tracking-widest font-medium flex items-center justify-center gap-2"
                >
                  <Instagram className="w-4 h-4 text-[#D9AA82]" />
                  <span>Open on Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
