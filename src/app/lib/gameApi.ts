interface Game {
    id: number;
    name: string;
    description_raw: string;
    background_image: string;
    released: string;
    updated: string;
    metacritic: number;
    playtime: number;
    rating: number;
    genres: Array<{ name: string }>;
    publishers: Array<{ name: string }>;
    platforms: Array<{ platform: { name: string } }>;
    tags: Array<{ id: number; name: string }>;
}

interface ApiResponse<T> {
    results: T[];
    count: number;
}

interface PaginatedResponse<T> {
    results: T[];
    count: number;
    totalPages: number;
}

interface GameTrailer {
    id: number;
    name: string;
    preview: string;
    data: {
        '480': string;
        max: string;
    };
}

interface GameScreenshot {
    id: number;
    image: string;
}

interface GameAchievement {
    id: number;
    name: string;
    description: string;
    image: string;
    percent: number;
}

interface GameStore {
    store_id: number;
    url: string;
}

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function fetchCarouselGames(): Promise<Game[]> {
    try {
        const res = await fetch(`${BASE_URL}/lists/popular?key=${API_KEY}&page_size=5`);
        if (!res.ok) throw new Error('Failed to fetch games for carousel.');
        const data: ApiResponse<Game> = await res.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching games for carousel:', error);
        return [];
    }
}

export async function fetchHomeTrendingGames(): Promise<Game[]> {
    try {
        const res = await fetch(`${BASE_URL}/lists/popular?key=${API_KEY}&page_size=8`);
        if (!res.ok) throw new Error('Failed to fetch games');
        const data: ApiResponse<Game> = await res.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching games:', error);
        return [];
    }
}

export async function fetchHomeLatestGames(): Promise<Game[]> {
    const currentDate = new Date();
    const last6MonthDate = new Date();
    last6MonthDate.setMonth(currentDate.getMonth() - 6);
    const startDate = last6MonthDate.toISOString().split('T')[0];
    const endDate = currentDate.toISOString().split('T')[0];
    try {
        const res = await fetch(`${BASE_URL}?key=${API_KEY}&dates=${startDate},${endDate}&ordering=-released&page_size=8`);
        if (!res.ok) throw new Error('Failed to fetch games');
        const data: ApiResponse<Game> = await res.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching games:', error);
        return [];
    }
}

export async function fetchHomeTopGames(): Promise<Game[]> {
    try {
        const res = await fetch(`${BASE_URL}?key=${API_KEY}&metacritic=90,100&ordering=-metacritic&page_size=8`);
        if (!res.ok) throw new Error('Failed to fetch games');
        const data: ApiResponse<Game> = await res.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching games:', error);
        return [];
    }
}

export async function fetchHomeUpdatedGames(): Promise<Game[]> {
    const currentDate = new Date();
    const lastMonthDate = new Date();
    lastMonthDate.setMonth(currentDate.getMonth() - 1);
    const startDate = lastMonthDate.toISOString().split('T')[0];
    const endDate = currentDate.toISOString().split('T')[0];
    try {
        const res = await fetch(`${BASE_URL}?key=${API_KEY}&updated=${startDate},${endDate}&ordering=-updated&page_size=8`);
        if (!res.ok) throw new Error('Failed to fetch games');
        const data: ApiResponse<Game> = await res.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching games:', error);
        return [];
    }
}

export async function fetchAllGames(page: number): Promise<PaginatedResponse<Game>> {
    try {
        const res = await fetch(`${BASE_URL}?key=${API_KEY}&page=${page}&page_size=40`);
        if (!res.ok) throw new Error('Failed to fetch games');
        const data: ApiResponse<Game> = await res.json();
        return {
            results: data.results,
            count: data.count,
            totalPages: Math.ceil(data.count / 40)
        };
    } catch (error) {
        console.error('Error fetching games:', error);
        return { results: [], count: 0, totalPages: 0 };
    }
}

export async function fetchAllTrendingGames(page: number): Promise<PaginatedResponse<Game>> {
    try {
        const res = await fetch(`${BASE_URL}/lists/popular?key=${API_KEY}&page=${page}&page_size=40`);
        if (!res.ok) throw new Error('Failed to fetch games');
        const data: ApiResponse<Game> = await res.json();
        return {
            results: data.results,
            count: data.count,
            totalPages: Math.ceil(data.count / 40)
        };
    } catch (error) {
        console.error('Error fetching games:', error);
        return { results: [], count: 0, totalPages: 0 };
    }
}

export async function fetchAllLatestGames(page: number): Promise<PaginatedResponse<Game>> {
    const currentDate = new Date();
    const last6MonthDate = new Date();
    last6MonthDate.setMonth(currentDate.getMonth() - 6);
    const startDate = last6MonthDate.toISOString().split('T')[0];
    const endDate = currentDate.toISOString().split('T')[0];
    try {
        const res = await fetch(`${BASE_URL}?key=${API_KEY}&dates=${startDate},${endDate}&ordering=-released&page=${page}&page_size=40`);
        if (!res.ok) throw new Error('Failed to fetch games');
        const data: ApiResponse<Game> = await res.json(); 

        return {
            results: data.results,
            count: data.count,
            totalPages: Math.ceil(data.count / 40)
        };
    } catch (error) {
        console.error('Error fetching games:', error);
        return { results: [], count: 0, totalPages: 0 };
    }
}

export async function fetchAllTopGames(page: number): Promise<PaginatedResponse<Game>> {
    try {
        const res = await fetch(`${BASE_URL}?key=${API_KEY}&metacritic=80,100&ordering=-metacritic&page=${page}&page_size=40`);
        if (!res.ok) throw new Error(`Failed to fetch games`);
        const data: ApiResponse<Game> = await res.json();
        return {
            results: data.results,
            count: data.count,
            totalPages: Math.ceil(data.count / 40),
        };
    } catch (error) {
        console.error('Error fetching games:', error);
        return { results: [], count: 0, totalPages: 0 };
    }
}

export async function fetchAllUpdatedGames(page: number): Promise<PaginatedResponse<Game>> {
    const currentDate = new Date();
    const lastMonthDate = new Date();
    lastMonthDate.setMonth(currentDate.getMonth() - 1);
    const startDate = lastMonthDate.toISOString().split('T')[0];
    const endDate = currentDate.toISOString().split('T')[0];
    try {
        const res = await fetch(`${BASE_URL}?key=${API_KEY}&updated=${startDate},${endDate}&ordering=-updated&page=${page}&page_size=40`);
        if (!res.ok) throw new Error('Failed to fetch games');
        const data: ApiResponse<Game> = await res.json();
        return {
            results: data.results,
            count: data.count,
            totalPages: Math.ceil(data.count / 40)
        };
    } catch (error) {
        console.error('Error fetching games:', error);
        return { results: [], count: 0, totalPages: 0 };
    }
}

export async function fetchGameDetails(gameId: string): Promise<Game | null> {
    try {
        const res = await fetch(`${BASE_URL}/${gameId}?key=${API_KEY}`);
        if (!res.ok) throw new Error('Failed to fetch game details');
        const data: Game = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching game details:', error);
        return null;
    }
}

export async function fetchSimilarGames(gameId: string): Promise<Game[]> {
    try {
        const res = await fetch(`${BASE_URL}/${gameId}/game-series?key=${API_KEY}`);
        if (!res.ok) throw new Error('Failed to fetch similar games');
        const data: ApiResponse<Game> = await res.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching similar games:', error);
        return [];
    }
}

export async function fetchGameTrailers(gameId: string): Promise<GameTrailer[]> {
    try {
        const res = await fetch(`${BASE_URL}/${gameId}/movies?key=${API_KEY}`);
        if (!res.ok) {
            if (res.status === 404) return [];
            throw new Error(`Failed to fetch game trailers: ${res.status}`);
        }
        const data: ApiResponse<GameTrailer> = await res.json();
        return data.results.filter(trailer => 
            trailer.data && 
            trailer.data['480'] && 
            trailer.data.max
        );
    } catch (error) {
        console.error('Error fetching game trailers:', error);
        return [];
    }
}

export async function fetchGameScreenshots(gameId: string): Promise<GameScreenshot[]> {
    try {
        const res = await fetch(`${BASE_URL}/${gameId}/screenshots?key=${API_KEY}`);
        if (!res.ok) throw new Error('Failed to fetch game screenshots');
        const data: ApiResponse<GameScreenshot> = await res.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching game screenshots:', error);
        return [];
    }
}

export async function fetchGameAchievements(gameId: string): Promise<GameAchievement[]> {
    try {
        const res = await fetch(`${BASE_URL}/${gameId}/achievements?key=${API_KEY}`);
        if (!res.ok) {
            if (res.status === 404) return [];
            throw new Error(`Failed to fetch game achievements: ${res.status}`);
        }
        const data: ApiResponse<GameAchievement> = await res.json();
        return data.results.map(achievement => ({
            ...achievement,
            percent: typeof achievement.percent === 'string' ? parseFloat(achievement.percent) : achievement.percent
        }));
    } catch (error) {
        console.error('Error fetching game achievements:', error);
        return [];
    }
}

export async function fetchGameDLC(gameId: string): Promise<Game[]> {
    try {
        const res = await fetch(`${BASE_URL}/${gameId}/additions?key=${API_KEY}`);
        if (!res.ok) throw new Error('Failed to fetch game DLC');
        const data: ApiResponse<Game> = await res.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching game DLC:', error);
        return [];
    }
}

export async function fetchSearchedGames(query: string, page: number): Promise<PaginatedResponse<Game>> {
    try {
        const res = await fetch(`${BASE_URL}?key=${API_KEY}&search=${query}&page=${page}&page_size=40`);
        if (!res.ok) throw new Error('Failed to fetch games');
        const data: ApiResponse<Game> = await res.json();
        return {
            results: data.results,
            count: data.count,
            totalPages: Math.ceil(data.count / 40)
        };
    } catch (error) {
        console.error('Error fetching games:', error);
        return { results: [], count: 0, totalPages: 0 };
    }
}

export async function fetchGameStores(gameId: string): Promise<GameStore[]> {
    try {
        const res = await fetch(`${BASE_URL}/${gameId}/stores?key=${API_KEY}`);
        if (!res.ok) throw new Error('Failed to fetch game stores');
        const data: ApiResponse<GameStore> = await res.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching game stores:', error);
        return [];
    }
}

interface Tag {
    id: number;
    name: string;
}

export async function fetchRecommendedGames(gameId: string): Promise<Game[]> {
    try {
        const gameDetails = await fetchGameDetails(gameId);
        if (!gameDetails || !gameDetails.tags || gameDetails.tags.length === 0) {
            return [];
        }

        const tags = gameDetails.tags
            .slice(0, 3)
            .map((tag: Tag) => tag.id)
            .join(',');
            
        const res = await fetch(`${BASE_URL}?key=${API_KEY}&tags=${tags}&exclude=${gameId}&ordering=-rating&page_size=12`);
        if (!res.ok) throw new Error('Failed to fetch recommended games');
        const data: ApiResponse<Game> = await res.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching recommended games:', error);
        return [];
    }
}