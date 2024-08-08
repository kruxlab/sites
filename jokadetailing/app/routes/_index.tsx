import logo from "~/assets/logo.png";
import hero from "~/assets/hero.webp";
import truck from "~/assets/truck.jpg";
import jeepInteriorBack from "~/assets/jeep-interior-back.jpg";
import jeepInteriorFront from "~/assets/jeep-interior-front.jpg";
import truckInteriorBack from "~/assets/truck-interior-back.jpg";
import truckInteriorFront from "~/assets/truck-interior-front.jpg";
import boatBack from '~/assets/boat-back.jpeg'
import boatFront from '~/assets/boat-front.jpeg'
import {
  SparklesIcon,
  TruckIcon,
  SunIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";
import clsx from "clsx";
import { z } from "zod";
import { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { Form, Link, useActionData } from "@remix-run/react";
import { getFormProps, useForm } from "@conform-to/react";
import { Field, FieldGroup, Fieldset, Label } from "~/components/fieldset";
import { Input } from "~/components/input";
import { Select } from "~/components/select";
import { submitContactForm } from "~/email";

const schema = z.object({
  name: z.string({ required_error: "Name is required." }),
  email: z.string({ required_error: "Email is required." }),
  phone: z.string({ required_error: "Phone is required." }),
  address: z.string({ required_error: "Address is required." }),
  service: z.string({
    required_error: "Service is required.",
  }),
  date: z.string({ required_error: "Date is required." }),
  time: z.string({ required_error: "Time is required." }),
});

const tiers = [
  {
    name: "Basic Detail",
    id: "tier-basic",
    price: "$69",
    description: "Your vehicle interior thoroughly cleaned.",
    features: [
      "High Powered Vacuuming",
      "Interior Surface Wipe Down",
      "Sparkling Glass Care",
    ],
  },
  {
    name: "Full Auto Detail",
    id: "tier-vehicle",
    price: "$159",
    description: "A showroom finish of your autos interior.",
    features: [
      "High Powered Vacuuming",
      "Interior Surface Deep Clean",
      "Sparkling Glass Care",
    ],
  },
  {
    name: "Full Boat Detail",
    id: "tier-boat",
    price: "$179",
    description: "A showroom finish of your boats interior.",
    features: [
      "High Powered Vacuuming",
      "Interior Surface Deep Clean",
      "Sparkling Glass Care",
      "Water Spots/Stains/Mildew Removal",
    ],
  },
];

const features = [
  {
    name: "Premium Car Detailing",
    description:
      "Comprehensive interior detailing services that include hand washing and interior deep cleaning to keep your car looking showroom fresh.",
    icon: SparklesIcon,
  },
  {
    name: "Expert Boat Detailing",
    description:
      "Specialized detailing for boats that keep your interior great and enjoyable all season long.",
    icon: SunIcon,
  },
  {
    name: "Mobile Convenience",
    description:
      "We bring our detailing expertise to you, offering flexible scheduling and on-site service to fit your busy lifestyle, whether at home, work, or dockside.",
    icon: TruckIcon,
  },
];

const featuredProject = {
  image: truck,
  name: "Ford F150",
  date: "May 2024",
};

const projects = [
  [
    [
      {
        image: jeepInteriorBack,
        height: 275,
        title: "2011 Jeep Liberty",
        date: "July 2024",
      },
      {
        height: 325,
        image: truckInteriorFront,
        title: "2018 Chevy Silverado",
        date: "June 2024",
      },
    ],
    [
      {
        height: 275,
        image: boatFront,
        title: "Wellcraft Excalibur",
        date: "July 2024",
      },
    ],
  ],
  [
    [
      {
        height: 275,
        image: truckInteriorBack,
        title: "2018 Chevy Silverado",
        date: "June 2024",
      },
    ],
    [
      {
        height: 325,
        image: jeepInteriorFront,
        title: "2011 Jeep Liberty",
        date: "July 2024",
      },
      {
        height: 275,
        image: boatBack,
        title: "Wellcraft Excalibur",
        date: "July 2024",
      },
    ],
  ],
];

const navigation = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/people/Joka-Mobile-Detailing/61561669515110/",
    icon: (props: any) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
];

export async function action({ request }: ActionFunctionArgs) {
  const submission = parseWithZod(await request.formData(), { schema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await submitContactForm(submission.value);

  return submission.reply();
}

export default function Index() {
  const lastResult = useActionData<typeof action>();

  const [form, fields] = useForm({
    lastResult,
    constraint: getZodConstraint(schema),
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
  });

  const isSubmissionSuccessful = lastResult && lastResult.status === "success";
  return (
    <>
      <div className="relative isolate overflow-hidden pt-14 h-dvh">
        <img
          alt="ariel bla shot"
          src={hero}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />

        <div className="absolute inset-0 -z-10 h-full w-full object-cover bg-black bg-opacity-60" />

        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-yellow to-brown opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>

        <div className="mx-auto max-w-2xl h-dvh flex justify-center items-center text-center">
          <div>
            <img alt="logo" src={logo} className="h-56 w-56 mx-auto" />

            <p className="mt-6 text-lg leading-8 text-white font-semibold">
              Joka Detailing brings top-tier, mobile car and boat detailing
              right to the Brainerd Lakes Area. Experience the ultimate in
              precision and care, ensuring your ride shines like never before.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="#contact"
                className="rounded-md bg-yellow px-5 py-3 text-md font-semibold text-brown shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
              >
                Schedule Today
              </Link>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-red to-brown opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>

      <div className="overflow-hidden bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:ml-auto lg:pl-4 lg:pt-4">
              <div className="lg:max-w-lg">
                <h2 className="text-base font-semibold leading-7 text-red">
                  What We Offer
                </h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-brown sm:text-4xl">
                  The best in detailing
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  At Joka Detailing, we pride ourselves on delivering
                  exceptional detailing services tailored to meet the unique
                  needs of your vehicles, all with the convenience of mobile
                  service.
                </p>
                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                  {features.map((feature) => (
                    <div key={feature.name} className="relative pl-9">
                      <dt className="inline font-semibold text-gray-900">
                        <feature.icon
                          aria-hidden="true"
                          className="absolute left-1 top-1 h-5 w-5 text-red"
                        />
                        {feature.name}
                      </dt>{" "}
                      <dd className="inline">{feature.description}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <div className="flex items-start justify-end lg:order-first">
              <img
                alt="Product screenshot"
                src={truck}
                width={2432}
                height={1442}
                className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative isolate bg-white pb-32 pt-24 sm:pt-32">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="ml-[max(50%,38rem)] aspect-[1313/771] w-[82.0625rem] bg-gradient-to-tr from-brown to-yellow"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 -z-10 flex transform-gpu overflow-hidden pt-32 opacity-25 blur-3xl sm:pt-40 xl:justify-end"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="ml-[-22rem] aspect-[1313/771] w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-gradient-to-tr from-red to-brown xl:ml-0 xl:mr-[calc(50%-12rem)]"
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-lg font-semibold leading-8 tracking-tight text-red">
              Past Work
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-brown sm:text-4xl">
              We're proud of our product
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4">
            <figure className="rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5 sm:col-span-2 xl:col-start-2 xl:row-end-1 relative overflow-hidden">
              <img
                src={featuredProject.image}
                alt={featuredProject.name}
                className="w-full h-full object-cover"
              />
              <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <div className="text-white">
                  <div className="font-semibold text-lg">
                    {featuredProject.name}
                  </div>
                  <div className="text-sm">{featuredProject.date}</div>
                </div>
              </figcaption>
            </figure>

            {projects.map((columnGroup, columnGroupIdx) => (
              <div
                key={columnGroupIdx}
                className="space-y-8 xl:contents xl:space-y-0"
              >
                {columnGroup.map((column, columnIdx) => (
                  <div
                    key={columnIdx}
                    className={clsx(
                      (columnGroupIdx === 0 && columnIdx === 0) ||
                        (columnGroupIdx === projects.length - 1 &&
                          columnIdx === columnGroup.length - 1)
                        ? "xl:row-span-2"
                        : "xl:row-start-1",
                      "space-y-8"
                    )}
                  >
                    {column.map((project) => (
                      <figure
                        key={project.title}
                        className="rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5 relative overflow-hidden"
                        style={{ height: project.height }}
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                        <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                          <div className="text-white">
                            <div className="font-semibold text-lg">
                              {project.title}
                            </div>
                            <div className="text-sm">{project.date}</div>
                          </div>
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl sm:text-center">
            <h2 className="text-base font-semibold leading-7 text-red">
              Pricing
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-brown sm:text-4xl">
              Offerings that fit your needs
            </p>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 sm:text-center">
            Explore our specialized product offerings designed to provide
            top-notch care and maintenance for your cars and boats, ensuring
            they look their best all year round.
          </p>
          <div className="mt-20 flow-root">
            <div className="isolate -mt-16 grid max-w-sm grid-cols-1 gap-y-16 divide-y divide-gray-100 sm:mx-auto lg:-mx-8 lg:mt-0 lg:max-w-none lg:grid-cols-3 lg:divide-x lg:divide-y-0 xl:-mx-4">
              {tiers.map((tier) => (
                <div key={tier.id} className="pt-16 lg:px-8 lg:pt-0 xl:px-14">
                  <h3
                    id={tier.id}
                    className="text-base font-semibold leading-7 text-gray-900"
                  >
                    {tier.name}
                  </h3>

                  <div className="mt-6">
                    <p className="text-sm font-semibold text-gray-600">
                      Starting at
                    </p>
                    <p className="mt-1 flex items-baseline gap-x-1">
                      <span className="text-5xl font-bold tracking-tight text-gray-900">
                        {tier.price}
                      </span>
                    </p>
                  </div>
                  <Link
                    to="#contact"
                    aria-describedby={tier.id}
                    className="mt-10 block rounded-md bg-yellow px-3 py-2 text-center text-sm font-semibold leading-6 text-brown shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Book Service
                  </Link>
                  <p className="mt-10 text-sm font-semibold leading-6 text-gray-900">
                    {tier.description}
                  </p>
                  <ul
                    role="list"
                    className="mt-6 space-y-3 text-sm leading-6 text-gray-600"
                  >
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex gap-x-3">
                        <CheckCircleIcon
                          aria-hidden="true"
                          className="h-6 w-5 flex-none text-yellow"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        id="contact"
        className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-red">
            Contact Us
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-brown sm:text-4xl">
            Book our services
          </p>

          <p className="mt-2 text-lg leading-8 text-gray-600">
            We're excited to get your vehicle looking great. After completing
            the form below we will reach out shortly to confirm a time.
          </p>
        </div>

        {isSubmissionSuccessful ? (
          <div className="mx-auto mt-16 max-w-xl sm:mt-20">
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckCircleIcon
                    className="h-5 w-5 text-green-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    Submission Successful
                  </h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>
                      Thank you for your submission. We'll be in touch shortly
                      to confirm your appointment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Form
            method="POST"
            className="mx-auto mt-16 max-w-xl sm:mt-20"
            {...getFormProps(form)}
          >
            <Fieldset>
              <FieldGroup>
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                  <Field className="sm:col-span-2">
                    <Label>Name</Label>
                    <Input type="text" name="name" field={fields.name} />
                  </Field>

                  <Field>
                    <Label>Email</Label>
                    <Input type="tel" name="email" field={fields.email} />
                  </Field>

                  <Field>
                    <Label>Phone</Label>
                    <Input type="tel" name="phone" field={fields.phone} />
                  </Field>

                  <Field className="sm:col-span-2">
                    <Label>Address</Label>
                    <Input type="text" name="address" field={fields.address} />
                  </Field>

                  <Field className="sm:col-span-2">
                    <Label>Service</Label>
                    <Select
                      name="service"
                      defaultValue="full-auto-detail"
                      field={fields.service}
                    >
                      <option value="basic-detail">Basic Detail</option>
                      <option value="full-auto-detail">Full Auto Detail</option>
                      <option value="full-boat-detail">Full Boat Detail</option>
                    </Select>
                  </Field>

                  <Field>
                    <Label>Date</Label>
                    <Input type="date" name="date" field={fields.date} />
                  </Field>

                  <Field>
                    <Label>Time of Day</Label>
                    <Select
                      name="time"
                      defaultValue="afternoon"
                      field={fields.time}
                    >
                      <option value="morning">Morning</option>
                      <option value="afternoon">Afternoon</option>
                      <option value="evening">Evening</option>
                    </Select>
                  </Field>
                </div>
              </FieldGroup>
            </Fieldset>

            <div className="mt-10">
              <button
                className="w-full block rounded-md bg-yellow px-3 py-2 text-center text-sm font-semibold leading-6 text-brown shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                type="submit"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </div>

      <footer className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon aria-hidden="true" className="h-6 w-6" />
              </a>
            ))}
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs leading-5 text-gray-500">
              &copy; 2024 Joka Detailing. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export const meta: MetaFunction = () => {
  return [
    { title: "Joka Detailing | Mobile Car and Boat Detailing Services" },
    {
      property: "og:title",
      content: "Joka Detailing | Mobile Car and Boat Detailing Services",
    },
    {
      name: "description",
      content:
        "Joka Detailing offers top-tier mobile detailing for cars and boats in central Minnesota. Experience premium service with the convenience of on-site detailing.",
    },
    {
      property: "og:description",
      content:
        "Joka Detailing provides premium mobile car and boat detailing services. We come to you, offering flexible scheduling and expert care for your vehicles.",
    },
    {
      property: "og:url",
      content: "https://jokadetailing.com",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: "Joka Detailing | Mobile Car and Boat Detailing Services",
    },
    {
      name: "twitter:description",
      content:
        "Discover top-tier mobile detailing for your cars and boats with Joka Detailing. We offer premium services with the convenience of coming to you.",
    },
    {
      name: "keywords",
      content:
        "mobile detailing, car detailing, boat detailing, Joka Detailing, Minnesota detailing services, on-site detailing",
    },
  ];
};
