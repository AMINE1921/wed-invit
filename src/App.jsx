import { Routes, Route, Navigate } from 'react-router-dom';
import InvitationPage from './pages/InvitationPage';
import AccessDenied from './pages/AccessDenied';

export default function App() {
  return (
    <Routes>
      <Route path="/i/:code" element={<InvitationPage />} />
      <Route path="/access-denied" element={<AccessDenied />} />
      <Route path="*" element={<Navigate to="/access-denied" replace />} />
    </Routes>
  );
}
