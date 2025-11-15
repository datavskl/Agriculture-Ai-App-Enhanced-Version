const CACHE_NAME = 'agri-smart-cache-v3'; // Incremented cache version
const urlsToCache = [
  '/',
  '/index.html',
  '/src/index.tsx',
  '/src/App.tsx',
  '/src/types.ts',
  '/src/constants.ts',
  '/src/services/geminiService.ts',
  // Components
  '/src/components/Sidebar.tsx',
  '/src/components/Header.tsx',
  '/src/components/DashboardCard.tsx',
  '/src/components/Loader.tsx',
  '/src/components/ImageUploader.tsx',
  '/src/components/Modal.tsx',
  '/src/components/TaskItem.tsx',
  '/src/components/VoiceCommandModal.tsx',
  // Pages
  '/src/pages/Dashboard.tsx',
  '/src/pages/Weather.tsx',
  '/src/pages/SoilAnalysis.tsx',
  '/src/pages/DiseaseDetection.tsx',
  '/src/pages/MarketIntelligence.tsx',
  '/src/pages/AdminPanel.tsx',
  '/src/pages/Profile.tsx',
  '/src/pages/TaskManager.tsx',
  '/src/pages/AgriChat.tsx',
  '/src/pages/YieldPrediction.tsx',
  '/src/pages/ResourceOptimization.tsx',
  '/src/pages/FarmReports.tsx',
  '/src/pages/FarmMap.tsx',
  '/src/pages/FinancialLedger.tsx',
  '/src/pages/InventoryManager.tsx',
  '/src/pages/CommunityHub.tsx',
  // NEW V3 PAGES
  '/src/pages/PestPrediction.tsx',
  '/src/pages/CropRotationPlanner.tsx',
  '/src/pages/EquipmentLog.tsx',
  '/src/pages/Marketplace.tsx',
  '/src/pages/ExpertConnect.tsx',
  '/src/pages/Achievements.tsx',
  '/src/pages/LearningHub.tsx',
  // Icons
  '/src/components/icons/BeakerIcon.tsx',
  '/src/components/icons/CameraIcon.tsx',
  '/src/components/icons/ChartBarIcon.tsx',
  '/src/components/icons/ChatBubbleIcon.tsx',
  '/src/components/icons/CogIcon.tsx',
  '/src/components/icons/HomeIcon.tsx',
  '/src/components/icons/LeafIcon.tsx',
  '/src/components/icons/SunIcon.tsx',
  '/src/components/icons/UserIcon.tsx',
  '/src/components/icons/ClipboardListIcon.tsx',
  '/src/components/icons/TrashIcon.tsx',
  '/src/components/icons/FireIcon.tsx',
  '/src/components/icons/ChatAlt2Icon.tsx',
  '/src/components/icons/TrendingUpIcon.tsx',
  '/src/components/icons/CalculatorIcon.tsx',
  '/src/components/icons/DocumentReportIcon.tsx',
  '/src/components/icons/MapIcon.tsx',
  '/src/components/icons/CashIcon.tsx',
  '/src/components/icons/ArchiveIcon.tsx',
  '/src/components/icons/UsersIcon.tsx',
  '/src/components/icons/ArrowCircleUpIcon.tsx',
  '/src/components/icons/ArrowCircleDownIcon.tsx',
  '/src/components/icons/BellIcon.tsx',
  '/src/components/icons/PencilIcon.tsx',
  // NEW V3 ICONS
  '/src/components/icons/AcademicCapIcon.tsx',
  '/src/components/icons/BugIcon.tsx',
  '/src/components/icons/MicrophoneIcon.tsx',
  '/src/components/icons/RefreshIcon.tsx',
  '/src/components/icons/ShieldCheckIcon.tsx',
  '/src/components/icons/ShoppingBagIcon.tsx',
  '/src/components/icons/SparklesIcon.tsx',
  '/src/components/icons/WrenchScrewdriverIcon.tsx',
  // External Libraries
  'https://cdn.tailwindcss.com',
  'https://aistudiocdn.com/react@^19.2.0',
  'https://aistudiocdn.com/react-dom@^19.2.0/',
  'https://aistudiocdn.com/react-router-dom@^7.9.4',
  'https://aistudiocdn.com/@google/genai@^1.26.0',
  'https://aistudiocdn.com/recharts@^3.3.0'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        // Add all URLs to cache, but don't fail the install if one fails
        return Promise.all(
            urlsToCache.map(url => cache.add(url).catch(err => console.warn(`Failed to cache ${url}:`, err)))
        );
      })
  );
});

self.addEventListener('fetch', event => {
    // For navigation requests, use a network-first strategy
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request).catch(() => caches.match('/index.html'))
        );
        return;
    }

    event.respondWith(
        caches.match(event.request)
        .then(response => {
            // Cache hit - return response
            if (response) {
                return response;
            }

            return fetch(event.request).then(
                response => {
                    // Check if we received a valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        if(response.type === 'opaque'){
                             // Can't clone opaque responses, so just return them
                            return response;
                        }
                        return response;
                    }

                    const responseToCache = response.clone();

                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                }
            );
        })
    );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
