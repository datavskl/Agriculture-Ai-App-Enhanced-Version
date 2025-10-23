
const CACHE_NAME = 'agri-smart-cache-v3'; // Incremented cache version
const urlsToCache = [
  '/',
  '/index.html',
  '/index.tsx',
  '/App.tsx',
  '/types.ts',
  '/constants.ts',
  '/services/geminiService.ts',
  // Components
  '/components/Sidebar.tsx',
  '/components/Header.tsx',
  '/components/DashboardCard.tsx',
  '/components/Loader.tsx',
  '/components/ImageUploader.tsx',
  '/components/Modal.tsx',
  '/components/TaskItem.tsx',
  '/components/VoiceCommandModal.tsx',
  // Pages
  '/pages/Dashboard.tsx',
  '/pages/Weather.tsx',
  '/pages/SoilAnalysis.tsx',
  '/pages/DiseaseDetection.tsx',
  '/pages/MarketIntelligence.tsx',
  '/pages/AdminPanel.tsx',
  '/pages/Profile.tsx',
  '/pages/TaskManager.tsx',
  '/pages/AgriChat.tsx',
  '/pages/YieldPrediction.tsx',
  '/pages/ResourceOptimization.tsx',
  '/pages/FarmReports.tsx',
  '/pages/FarmMap.tsx',
  '/pages/FinancialLedger.tsx',
  '/pages/InventoryManager.tsx',
  '/pages/CommunityHub.tsx',
  // NEW V3 PAGES
  '/pages/PestPrediction.tsx',
  '/pages/CropRotationPlanner.tsx',
  '/pages/EquipmentLog.tsx',
  '/pages/Marketplace.tsx',
  '/pages/ExpertConnect.tsx',
  '/pages/Achievements.tsx',
  '/pages/LearningHub.tsx',
  // Icons
  '/components/icons/BeakerIcon.tsx',
  '/components/icons/CameraIcon.tsx',
  '/components/icons/ChartBarIcon.tsx',
  '/components/icons/ChatBubbleIcon.tsx',
  '/components/icons/CogIcon.tsx',
  '/components/icons/HomeIcon.tsx',
  '/components/icons/LeafIcon.tsx',
  '/components/icons/SunIcon.tsx',
  '/components/icons/UserIcon.tsx',
  '/components/icons/ClipboardListIcon.tsx',
  '/components/icons/TrashIcon.tsx',
  '/components/icons/FireIcon.tsx',
  '/components/icons/ChatAlt2Icon.tsx',
  '/components/icons/TrendingUpIcon.tsx',
  '/components/icons/CalculatorIcon.tsx',
  '/components/icons/DocumentReportIcon.tsx',
  '/components/icons/MapIcon.tsx',
  '/components/icons/CashIcon.tsx',
  '/components/icons/ArchiveIcon.tsx',
  '/components/icons/UsersIcon.tsx',
  '/components/icons/ArrowCircleUpIcon.tsx',
  '/components/icons/ArrowCircleDownIcon.tsx',
  '/components/icons/BellIcon.tsx',
  '/components/icons/PencilIcon.tsx',
  // NEW V3 ICONS
  '/components/icons/AcademicCapIcon.tsx',
  '/components/icons/BugIcon.tsx',
  '/components/icons/MicrophoneIcon.tsx',
  '/components/icons/RefreshIcon.tsx',
  '/components/icons/ShieldCheckIcon.tsx',
  '/components/icons/ShoppingBagIcon.tsx',
  '/components/icons/SparklesIcon.tsx',
  '/components/icons/WrenchScrewdriverIcon.tsx',
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