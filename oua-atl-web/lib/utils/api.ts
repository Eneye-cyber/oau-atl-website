
export const logout = async (userId: string, baseUrl: string, cookies?: any): Promise<boolean> => {
  try {
    console.log('Logging out...', cookies);
    const response = await fetch(`${baseUrl}/admins/${userId}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookies
      },
    });

    if (response.ok) {
      console.log('Logout successful');
      return true;
    } else {
      console.error(`Logout failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error during logout:', error);
  }
  return false;
};