export type MockAsyncState<T> =
  | {
      status: 'loading';
    }
  | {
      status: 'error';
      message: string;
    }
  | {
      status: 'empty';
      data: T;
    }
  | {
      status: 'success';
      data: T;
    };
