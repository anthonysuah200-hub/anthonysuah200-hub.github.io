/*
  Smart Tech Hub — Site Search Index
  -----------------------------------
  This file lists everything the search bar can find, across every page.
  Each entry is one searchable result.

  To add more results (e.g. for Courses, OWASP, Labs, CTF, Home):
  just copy an entry below and edit the four fields:

    title    -> what shows as the result's heading
    page     -> the .html file the link goes to
    section  -> optional #id on that page to jump to a specific spot
    snippet  -> a short one-line description shown under the title
    keywords -> extra search words that aren't in the title (optional)

  Save this file, re-upload it to your repo, and every page that loads
  it will pick up the new results automatically — no other changes needed.
*/

const SITE_SEARCH_INDEX = [

  // ---------------- HOME ----------------
  { title: "Home", page: "index.html", section: "", snippet: "Smart Tech Hub home page.", keywords: "start homepage" },

  // ---------------- COURSES ----------------
  { title: "Courses", page: "courses.html", section: "", snippet: "Browse all Smart Tech Hub courses.", keywords: "learning path catalog" },

  // ---------------- OWASP ----------------
  { title: "OWASP", page: "owasp.html", section: "", snippet: "OWASP Top 10 and web application security.", keywords: "owasp top 10 web security" },

  // ---------------- LABS ----------------
  { title: "Labs", page: "labs.html", section: "", snippet: "Hands-on practice labs.", keywords: "practice hands-on exercises" },

  // ---------------- CTF ----------------
  { title: "CTF", page: "ctf.html", section: "", snippet: "Capture the Flag challenges.", keywords: "ctf challenges competition" },

  // ---------------- NETWORK SECURITY: LESSONS ----------------
  { title: "IP Addresses", page: "network-security.html", section: "", snippet: "How IPv4 and IPv6 addresses identify devices on a network.", keywords: "ipv4 ipv6 192.168" },
  { title: "Ports and Services", page: "network-security.html", section: "", snippet: "What ports are and why unused ones should be secured.", keywords: "port 443 attack surface" },
  { title: "TCP and UDP", page: "network-security.html", section: "", snippet: "The two main transport-layer protocols and how they differ.", keywords: "transport layer connection connectionless" },
  { title: "DNS", page: "network-security.html", section: "", snippet: "How domain names are translated into IP addresses.", keywords: "domain name system dns monitoring" },
  { title: "Firewalls", page: "network-security.html", section: "", snippet: "How firewalls control traffic using security rules.", keywords: "firewall rules traffic control" },
  { title: "Network Discovery with Nmap", page: "network-security.html", section: "", snippet: "Using Nmap safely to discover hosts and open ports.", keywords: "nmap scan localhost 127.0.0.1" },

  // ---------------- NETWORK SECURITY: KEY TERMS ----------------
  { title: "Subnet / Subnet Mask", page: "network-security.html", section: "", snippet: "Dividing a network into smaller logical sections.", keywords: "255.255.255.0 subnetting" },
  { title: "Router", page: "network-security.html", section: "", snippet: "A device that forwards packets between networks." },
  { title: "Switch", page: "network-security.html", section: "", snippet: "Connects devices within a local network using MAC addresses." },
  { title: "DHCP", page: "network-security.html", section: "", snippet: "Automatically assigns IP addresses and network settings to devices." },
  { title: "NAT", page: "network-security.html", section: "", snippet: "Translates private IP addresses to public ones for internet access." },
  { title: "VPN", page: "network-security.html", section: "", snippet: "Creates a protected tunnel for traffic across untrusted networks." },
  { title: "IDS / IPS", page: "network-security.html", section: "", snippet: "Systems that detect (IDS) or block (IPS) suspicious network activity." },
  { title: "Zero Trust", page: "network-security.html", section: "", snippet: "A security model that never trusts access automatically, even inside the network." },
  { title: "CIA Triad", page: "network-security.html", section: "", snippet: "Confidentiality, Integrity, and Availability — the core security model." },
  { title: "Vulnerability", page: "network-security.html", section: "", snippet: "A weakness that could be exploited to cause harm." },
  { title: "Risk", page: "network-security.html", section: "", snippet: "The potential for a threat to exploit a vulnerability and cause impact." },
  { title: "Malware", page: "network-security.html", section: "", snippet: "Software designed to perform harmful or unauthorized actions." },
  { title: "Phishing", page: "network-security.html", section: "", snippet: "Social engineering that tricks people into revealing information." },
  { title: "DDoS", page: "network-security.html", section: "", snippet: "An attack that floods a target with traffic to make it unavailable." },
  { title: "SIEM", page: "network-security.html", section: "", snippet: "A platform that collects and analyzes security logs and events." },
  { title: "Incident Response", page: "network-security.html", section: "", snippet: "The organized process for handling a security incident." },
  { title: "Defense in Depth", page: "network-security.html", section: "", snippet: "Using multiple layers of security controls instead of relying on one." },

  // ---------------- WIRELESS SECURITY: LESSONS ----------------
  { title: "Wi-Fi Encryption Standards", page: "wireless-security.html", section: "", snippet: "WEP, WPA, WPA2, and WPA3 compared.", keywords: "wep wpa wpa2 wpa3 encryption" },
  { title: "SSID, BSSID, and Hidden Networks", page: "wireless-security.html", section: "", snippet: "Network names, access point addresses, and why hiding an SSID isn't real security." },
  { title: "Common Wireless Attack Patterns", page: "wireless-security.html", section: "", snippet: "Rogue APs, evil twins, deauth attacks, and handshake capture explained.", keywords: "evil twin rogue ap deauth handshake" },
  { title: "Wireless Defensive Controls", page: "wireless-security.html", section: "", snippet: "WPA3, strong passphrases, disabling WPS, and network segmentation.", keywords: "wps segmentation guest network" },

  // ---------------- WIRELESS SECURITY: KEY TERMS ----------------
  { title: "WPA3 / SAE", page: "wireless-security.html", section: "", snippet: "The current Wi-Fi security standard and its handshake method." },
  { title: "WPS", page: "wireless-security.html", section: "", snippet: "A setup feature often vulnerable to brute-force; usually best disabled." },
  { title: "4-Way Handshake", page: "wireless-security.html", section: "", snippet: "How a device and access point prove they share the same passphrase." },
  { title: "Rogue AP", page: "wireless-security.html", section: "", snippet: "An unauthorized access point connected to a network." },
  { title: "Evil Twin", page: "wireless-security.html", section: "", snippet: "A fake access point mimicking a legitimate SSID." },
  { title: "Deauthentication Frame", page: "wireless-security.html", section: "", snippet: "A forged frame that disconnects a device from an access point." },

  // ---------------- TOOLS & INTERACTIVE ----------------
  { title: "Subnet Calculator", page: "wireless-security.html", section: "subnet-tool", snippet: "Interactive tool: enter a CIDR address to get network, broadcast, and host range.", keywords: "cidr calculator ip range" },
  { title: "Wireless Security Quiz", page: "wireless-security.html", section: "", snippet: "Test your knowledge with a 5-question quiz.", keywords: "quiz test knowledge" },

  // ---------------- SOCIAL ----------------
  { title: "Follow & Watch — Facebook, Instagram, TikTok", page: "wireless-security.html", section: "", snippet: "Follow Smart Tech Hub and watch cybersecurity video explainers.", keywords: "social media facebook instagram tiktok video" },

];
