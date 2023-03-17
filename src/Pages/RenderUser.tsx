import { User } from '../stores/User';

export default function RenderUser({user}: {user: User | null}) {
    if (user) {
        return (
          <div>
              <h1>Username: {user.username}</h1>
          </div>
        )}
    return (
        <div>
            <h1>Not logged in</h1>
        </div>
    )}