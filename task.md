ROLE

You are a senior UI/UX engineer and frontend architect with 15+ years of experience.

Your goal is to build a premium weather dashboard that looks exactly like the provided design.

The UI must feel like a premium Apple + Microsoft Fluent + Modern Glassmorphism dashboard.

Do NOT simplify anything.

The layout should be extremely polished, perfectly aligned and responsive.

Desktop First.

No sidebar.

TECH STACK
React 19
Vite
Tailwind CSS
Framer Motion
Lucide React Icons
Recharts (only if graphs needed)
React CountUp for number animations
CSS backdrop-filter
CSS Grid
Flexbox
CSS variables

Do NOT use Bootstrap.

GLOBAL DESIGN

Entire page occupies full viewport.

width:100vw
height:100vh
overflow:hidden

Background should NOT be a plain color.

Use

Large weather image

Blur overlay

Blue gradient overlay

Glass effect

Radial light

Soft vignette

Background layering:

Layer 1

Weather landscape image

Layer 2

rgba(0,70,150,.35)

Layer 3

linear-gradient(
180deg,
rgba(0,30,80,.45),
rgba(0,60,120,.55)
)

Layer 4

backdrop blur

Result:

Modern premium weather dashboard.

PAGE PADDING
padding:24px
gap:20px

Everything centered.

Maximum width

1500px
GRID STRUCTURE

Entire dashboard uses CSS Grid.

------------------------------------------
 Search Bar
------------------------------------------

 Hero Card      | Current Conditions
                |
                | AQI
                | Sunrise

------------------------------------------

 Hourly Forecast

------------------------------------------

7 Day Forecast

------------------------------------------

Grid

2 columns

Left 65%

Right 35%

Gap

20px
SEARCH BAR

Top full width.

Height

60px

Glass card.

Rounded

18px

Contains

Search icon

Input

Settings button

Favorite button

Input takes 90%.

Buttons on right.

Hover animations.

Blue glow.

HERO WEATHER CARD

Large card.

Width

100%

Height

430px

Glassmorphism.

Rounded

24px

Inside card place

City

Date

Weather badge

Huge temperature

Weather description

High / Low

Feels like

Background image fills entire card.

Image has overlay.

Bottom gradient.

Everything aligned left.

Weather badge aligned top right.

Temperature

font-size:96px

font-weight:700

Description

32px

Spacing perfect.

RIGHT COLUMN

Contains

Card 1

Current Conditions

Card 2

AQI

Card 3

Sunrise Sunset

Cards stacked vertically.

Gap

20px

All same glass style.

Rounded

20px

CURRENT CONDITIONS CARD

Title

Current Conditions

Divider

Then rows.

Rows

Temperature

Humidity

Wind

Visibility

Pressure

UV

Each row

Icon

Label

Spacer

Value

Optional unit

Perfect spacing.

Thin dividers.

Hover highlight.

AQI CARD

Semi circular progress indicator.

Large animated number.

AQI status.

PM2.5

Rounded glass card.

SUNRISE CARD

Semi circle sun path.

Animated sun icon.

Sunrise

Sunset

Nicely centered.

HOURLY FORECAST

Full width glass card.

Height

180px

Contains

Title

Scrollable horizontal weather timeline.

Every item

Time

Icon

Temperature

Equal spacing.

Hover animation

Lift

Glow

Scale 1.05

7 DAY FORECAST

Full width.

Glass card.

Height

170px

Title left.

Button

View Full Forecast

Right.

Forecast row

Seven equal cards.

Each card

Day

Icon

High

Low

Hover

Blue glow.

TranslateY(-6px)

Smooth animation.

GLASSMORPHISM

Every card

background:
rgba(255,255,255,.08);

backdrop-filter:
blur(18px);

border:
1px solid rgba(255,255,255,.15);

box-shadow:
0 20px 60px rgba(0,0,0,.25);
TYPOGRAPHY

Font

Poppins

or

Inter

Headings

700

Labels

500

Values

600

White

Secondary

rgba(255,255,255,.7)

COLORS

Primary

#2E8BFF

Background

#0C4D8E

Accent

#4DA8FF

Text

White

AQI Green

#39D98A

Yellow

#FFD54A

Orange

#FF8A4C

Red

#FF4F6D
ICONS

Use Lucide React.

Animated.

Weather icons.

Humidity

Droplets

Wind

Gauge

Visibility

Sunrise

Sunset

Cloud

Rain

Thunder

etc.

ANIMATIONS

Framer Motion.

Cards

Fade

Slide up

Scale

Hover

Scale

1.02

Glow

Buttons

Ripple.

Numbers

Count up.

Weather badge

Floating animation.

Background

Slow moving gradient.

Clouds

Very subtle movement.

RESPONSIVENESS

Desktop

1440+

Perfect.

Laptop

1200+

Perfect.

Tablet

768+

Cards stack.

Mobile

Single column.

No overflow.

DATA

Create reusable components.

WeatherCard

CurrentConditions

AQICard

SunriseCard

HourlyForecast

ForecastDay

SearchBar

Background

All receive props.

No hardcoded UI.

CLEAN CODE

Component-based architecture.

No duplicate code.

Semantic HTML.

Reusable hooks.

Tailwind utilities.

Perfect spacing.

Meaningful naming.