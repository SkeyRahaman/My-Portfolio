import { personalInfo } from '../data';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer-text">© 2026 {personalInfo.name}. Built with craft & care.</p>
        <div className="footer-links">
          <a href={personalInfo.links.github} target="_blank" rel="noopener noreferrer" className="footer-link">
            GitHub
          </a>
          <a href={personalInfo.links.linkedin} target="_blank" rel="noopener noreferrer" className="footer-link">
            LinkedIn
          </a>
          <a href={personalInfo.links.leetcode} target="_blank" rel="noopener noreferrer" className="footer-link">
            LeetCode
          </a>
        </div>
      </div>
    </footer>
  );
}
