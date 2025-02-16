// Chat header 
export interface ChatHeaderPs {
    searchInput: string;
    searchRef: React.RefObject<HTMLInputElement>;
    setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  }
// Profile
export interface ProfileData {
  about: string;
}  