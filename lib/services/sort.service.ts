
export interface ISortService<T> {
  sort(items: T[], order: string): T[];
}


export interface ISortStrategy<T> {
  sort(items: T[]): T[];
}


export class NewestFirstStrategy<T extends { date: string }> implements ISortStrategy<T> {
  sort(items: T[]): T[] {
    return [...items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
}

export class OldestFirstStrategy<T extends { date: string }> implements ISortStrategy<T> {
  sort(items: T[]): T[] {
    return [...items].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }
}

export class TitleAscendingStrategy<T extends { title: string }> implements ISortStrategy<T> {
  sort(items: T[]): T[] {
    return [...items].sort((a, b) => a.title.localeCompare(b.title));
  }
}


export class SortService<T> implements ISortService<T> {
  private strategies: Map<string, ISortStrategy<T>>;

  constructor(strategies: Map<string, ISortStrategy<T>>) {
    this.strategies = strategies;
  }

  sort(items: T[], order: string): T[] {
    const strategy = this.strategies.get(order);
    if (!strategy) {
      return items; 
    }
    return strategy.sort(items);
  }
}


export function createAchievementSortService<T extends { date: string; title: string }>(): SortService<T> {
  const strategies = new Map<string, ISortStrategy<T>>();
  strategies.set("newest", new NewestFirstStrategy<T>());
  strategies.set("oldest", new OldestFirstStrategy<T>());
  strategies.set("title", new TitleAscendingStrategy<T>());
  return new SortService<T>(strategies);
}


