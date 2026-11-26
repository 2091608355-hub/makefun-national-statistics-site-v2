// Figures for China by Numbers.
// Source for every number: National Bureau of Statistics of China,
// Statistical Communiqué 2024 and China Statistical Yearbook.
// The year is 2024 throughout unless a line says otherwise.
// Money is in yuan; headcounts are in millions of people.

export const SITE_META = {
  country: 'China',
  year: 2024,
  source: 'National Bureau of Statistics of China',
  updated: '26 November 2026',
};

// Six headline numbers shown on the home page.
export const KEY_NUMBERS = [
  { key: 'population', label: 'Population', value: '1,408.3m', change: 'down 1.39m vs 2023', note: 'at the end of the year' },
  { key: 'gdp', label: 'Economy', value: '¥134.9tr', change: 'up 5.0% in real terms', note: 'roughly $18.5tr' },
  { key: 'percapita', label: 'GDP per person', value: '¥95,749', change: 'up 5.1% in real terms', note: 'roughly $13,100' },
  { key: 'lifespan', label: 'Life expectancy', value: '79.0 years', change: 'up 0.3 years', note: 'at birth' },
  { key: 'urban', label: 'Living in cities', value: '67.0%', change: 'up 0.84 points', note: '943.5m urban residents' },
  { key: 'jobless', label: 'Urban jobless rate', value: '5.1%', change: 'down 0.1 points', note: 'surveyed, annual average' },
];

// GDP, trillion yuan, plus the real growth rate for each year.
export const GDP_SERIES = [
  { year: 2015, gdp: 68.9, growth: 7.0 },
  { year: 2016, gdp: 74.6, growth: 6.8 },
  { year: 2017, gdp: 83.2, growth: 6.9 },
  { year: 2018, gdp: 91.9, growth: 6.7 },
  { year: 2019, gdp: 98.7, growth: 6.0 },
  { year: 2020, gdp: 101.4, growth: 2.2 },
  { year: 2021, gdp: 114.9, growth: 8.6 },
  { year: 2022, gdp: 120.5, growth: 3.0 },
  { year: 2023, gdp: 126.1, growth: 5.2 },
  { year: 2024, gdp: 134.9, growth: 5.0 },
];

// Population by age band, end of 2024. Headcount in millions.
export const AGE_GROUPS = [
  { band: '0–14', people: 232, share: 16.5 },
  { band: '15–59', people: 857, share: 60.9 },
  { band: '60+', people: 310, share: 22.0 },
  { band: '65+', people: 220, share: 15.6 },
];

// Where GDP comes from in 2024. Value added, trillion yuan.
export const INDUSTRY_SPLIT = [
  { name: 'Services', share: 54.6, value: 73.7, colour: '#1e40af' },
  { name: 'Industry', share: 38.3, value: 51.7, colour: '#0e7490' },
  { name: 'Agriculture', share: 7.1, value: 9.6, colour: '#4d7c0f' },
];

// Trade, prices and incomes, 2024.
export const TRADE_FACTS = [
  { label: 'Goods exports', value: '¥25.45tr', change: '+7.1%' },
  { label: 'Goods imports', value: '¥18.39tr', change: '+2.3%' },
  { label: 'Goods trade surplus', value: '¥7.06tr', change: '+21.1%' },
  { label: 'Consumer prices (CPI)', value: '+0.2%', change: 'annual average' },
  { label: 'Retail sales', value: '¥48.79tr', change: '+3.5%' },
  { label: 'Fixed-asset investment', value: '¥51.44tr', change: '+3.2%' },
  { label: 'Disposable income per person', value: '¥41,314', change: '+5.3%' },
  { label: 'Research and development', value: '¥3.61tr', change: '2.7% of GDP' },
];

// Ten largest provinces by GDP, 2024. GDP in trillion yuan,
// population in millions, capital city as named.
export const TOP_PROVINCES = [
  { name: 'Guangdong', gdp: 14.16, population: 127.4, capital: 'Guangzhou' },
  { name: 'Jiangsu', gdp: 13.70, population: 85.3, capital: 'Nanjing' },
  { name: 'Shandong', gdp: 9.86, population: 101.9, capital: 'Jinan' },
  { name: 'Zhejiang', gdp: 9.01, population: 66.6, capital: 'Hangzhou' },
  { name: 'Sichuan', gdp: 6.47, population: 83.8, capital: 'Chengdu' },
  { name: 'Henan', gdp: 6.36, population: 98.1, capital: 'Zhengzhou' },
  { name: 'Hubei', gdp: 6.00, population: 58.5, capital: 'Wuhan' },
  { name: 'Fujian', gdp: 5.77, population: 41.9, capital: 'Fuzhou' },
  { name: 'Shanghai', gdp: 5.39, population: 24.8, capital: 'Shanghai' },
  { name: 'Hunan', gdp: 5.32, population: 65.6, capital: 'Changsha' },
];

// Health and education, 2024.
export const HEALTH_SCHOOL = [
  { label: 'Hospital beds per 10,000 people', value: '75.6' },
  { label: 'Doctors per 10,000 people', value: '33.9' },
  { label: 'Infant deaths per 1,000 births', value: '4.0‰' },
  { label: 'Maternal deaths per 100,000 births', value: '14.3' },
  { label: 'Young people in higher education', value: '62.6%' },
  { label: 'University students', value: '47.6m' },
  { label: 'Completing nine years of school', value: '95.9%' },
  { label: 'Public libraries', value: '3,311' },
];

// Environment, energy and infrastructure, 2024.
export const ENVIRONMENT = [
  { label: 'Forest cover', value: '25.1%' },
  { label: 'New-energy vehicles built', value: '12.89m' },
  { label: 'Solar capacity installed', value: '887 GW' },
  { label: 'Wind capacity installed', value: '521 GW' },
  { label: 'Grain harvest', value: '706.5m t' },
  { label: 'High-speed rail in service', value: '48,000 km' },
  { label: '5G base stations', value: '4.25m' },
  { label: 'Parcels delivered', value: '193.7bn' },
];
