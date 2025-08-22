document.addEventListener('DOMContentLoaded', function() {
    // Initialize form steps
    const form = document.getElementById('jobApplicationForm');
    const progressSteps = document.querySelectorAll('.progress-steps .step');
    const formSteps = document.querySelectorAll('.form-step');
    
    // Show first step by default
    formSteps.forEach((step, index) => {
        if (index === 0) {
            step.style.display = 'block';
            step.classList.add('active');
        } else {
            step.style.display = 'none';
            step.classList.remove('active');
        }
    });
    
    // Update progress steps
    function updateProgress(stepNumber) {
        progressSteps.forEach((step, index) => {
            if (index < stepNumber) {
                step.classList.add('completed');
                step.classList.remove('active');
            } else if (index === stepNumber - 1) {
                step.classList.add('active');
                step.classList.remove('completed');
            } else {
                step.classList.remove('active', 'completed');
            }
        });
    }

    // Next button click handler
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-next') || e.target.closest('.btn-next')) {
            e.preventDefault();
            const btn = e.target.classList.contains('btn-next') ? e.target : e.target.closest('.btn-next');
            const currentStep = btn.closest('.form-step');
            const nextStepId = btn.getAttribute('data-next');
            
            if (validateStep(currentStep)) {
                // Hide all steps
                formSteps.forEach(step => {
                    step.style.display = 'none';
                    step.classList.remove('active');
                });
                
                // Show next step
                const nextStep = document.getElementById(`step-${nextStepId}`);
                if (nextStep) {
                    nextStep.style.display = 'block';
                    nextStep.classList.add('active');
                    
                    // Update progress steps
                    updateProgress(nextStepId);
                    
                }
            }
        }
        
        // Previous button click handler
        if (e.target.classList.contains('btn-prev') || e.target.closest('.btn-prev')) {
            e.preventDefault();
            const btn = e.target.classList.contains('btn-prev') ? e.target : e.target.closest('.btn-prev');
            const prevStepId = btn.getAttribute('data-prev');
            
            // Hide all steps
            formSteps.forEach(step => {
                step.style.display = 'none';
                step.classList.remove('active');
            });
            
            // Show previous step
            const prevStep = document.getElementById(`step-${prevStepId}`);
            if (prevStep) {
                prevStep.style.display = 'block';
                prevStep.classList.add('active');
                
                // Update progress steps
                updateProgress(prevStepId);
                
                // Removed auto-scroll to top
            }
        }
    });
    
    // Add experience section
    if (addExperienceBtn) {
        addExperienceBtn.addEventListener('click', function() {
            const experienceTemplate = `
                <div class="experience-entry bg-light p-3 rounded mb-4">
                    <div class="d-flex justify-content-end">
                        <button type="button" class="btn-close remove-experience" aria-label="Remove"></button>
                    </div>
                    <div class="row g-3">
                        <div class="col-12">
                            <label class="form-label">Company Name <span class="text-danger">*</span></label>
                            <input type="text" class="form-control form-control-lg" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Job Title <span class="text-danger">*</span></label>
                            <input type="text" class="form-control form-control-lg" required>
                        </div>
                        <div class="col-md-3">
                            <label class="form-label">Start Date <span class="text-danger">*</span></label>
                            <input type="month" class="form-control form-control-lg" required>
                        </div>
                        <div class="col-md-3">
                            <label class="form-label">End Date</label>
                            <input type="month" class="form-control form-control-lg">
                            <div class="form-check mt-2">
                                <input class="form-check-input" type="checkbox">
                                <label class="form-check-label">I currently work here</label>
                            </div>
                        </div>
                        <div class="col-12">
                            <label class="form-label">Job Description</label>
                            <textarea class="form-control" rows="3"></textarea>
                        </div>
                    </div>
                </div>
            `;
            
            const div = document.createElement('div');
            div.innerHTML = experienceTemplate;
            experienceFields.appendChild(div);
            
            // Add event listener to remove button
            const removeBtn = div.querySelector('.remove-experience');
            if (removeBtn) {
                removeBtn.addEventListener('click', function() {
                    div.remove();
                });
            }
        });
    }
    
    // Add education section
    if (addEducationBtn) {
        addEducationBtn.addEventListener('click', function() {
            const educationTemplate = `
                <div class="education-entry bg-light p-3 rounded mb-4">
                    <div class="d-flex justify-content-end">
                        <button type="button" class="btn-close remove-education" aria-label="Remove"></button>
                    </div>
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label">Institution <span class="text-danger">*</span></label>
                            <input type="text" class="form-control form-control-lg" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Degree <span class="text-danger">*</span></label>
                            <input type="text" class="form-control form-control-lg" required>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Field of Study</label>
                            <input type="text" class="form-control form-control-lg">
                        </div>
                        <div class="col-md-3">
                            <label class="form-label">Graduation Year</label>
                            <input type="month" class="form-control form-control-lg">
                        </div>
                        <div class="col-md-3">
                            <label class="form-label">Grade/GPA</label>
                            <input type="text" class="form-control form-control-lg" placeholder="e.g. 3.5/4.0">
                        </div>
                    </div>
                </div>
            `;
            
            const div = document.createElement('div');
            div.innerHTML = educationTemplate;
            educationFields.appendChild(div);
            
            // Add event listener to remove button
            const removeBtn = div.querySelector('.remove-education');
            if (removeBtn) {
                removeBtn.addEventListener('click', function() {
                    div.remove();
                });
            }
        });
    }
    
    // Form submission
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate all steps before submission
            let allValid = true;
            steps.forEach(step => {
                if (!validateStep(step)) {
                    allValid = false;
                }
            });
            
            if (allValid) {
                // Here you would typically send the form data to a server
                const formData = new FormData(form);
                console.log('Form submitted:', Object.fromEntries(formData));
                
                // Show success message
                alert('Your application has been submitted successfully!');
                
                // Reset form
                form.reset();
                showStep('1');
                updateProgress('1');
                
                // Reset file names
                const fileNames = document.querySelectorAll('.file-name');
                fileNames.forEach(el => {
                    el.textContent = 'No file chosen' + 
                        (el.closest('label').getAttribute('for') === 'cv-upload' ? ' (PDF/DOC/DOCX, Max 5MB)' : '');
                });
            } else {
                // Scroll to first error
                const firstError = form.querySelector('.is-invalid');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }
    
    // Show specific step
    function showStep(stepId) {
        steps.forEach(step => {
            if (step.id === `step-${stepId}`) {
                step.classList.remove('d-none');
                step.classList.add('active');
            } else {
                step.classList.add('d-none');
                step.classList.remove('active');
            }
        });
    }
    
    // Update progress steps
    function updateProgress(stepNumber) {
        progressSteps.forEach((step, index) => {
            const stepNum = parseInt(step.getAttribute('data-step'));
            
            if (stepNum < stepNumber) {
                step.classList.add('completed');
                step.classList.add('active');
            } else if (stepNum == stepNumber) {
                step.classList.add('active');
                step.classList.remove('completed');
            } else {
                step.classList.remove('active', 'completed');
            }
        });
    }
    
    // Validate step
    function validateStep(step) {
        let isValid = true;
        const inputs = step.querySelectorAll('input[required], select[required], textarea[required]');
        
        inputs.forEach(input => {
            // Check if input is a checkbox
            if (input.type === 'checkbox') {
                if (!input.checked) {
                    input.classList.add('is-invalid');
                    isValid = false;
                } else {
                    input.classList.remove('is-invalid');
                }
            } 
            // Check if input is a file input
            else if (input.type === 'file') {
                if (input.files.length === 0) {
                    input.classList.add('is-invalid');
                    isValid = false;
                } else {
                    input.classList.remove('is-invalid');
                }
            }
            // Check for other required inputs
            else if (!input.value.trim()) {
                input.classList.add('is-invalid');
                isValid = false;
            } else {
                input.classList.remove('is-invalid');
                
                // Email validation
                if (input.type === 'email' && !isValidEmail(input.value)) {
                    input.classList.add('is-invalid');
                    isValid = false;
                }
                
                // Phone validation
                if (input.type === 'tel' && !isValidPhone(input.value)) {
                    input.classList.add('is-invalid');
                    isValid = false;
                }
            }
        });
        
        return isValid;
    }
    
    // Email validation helper
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Phone validation helper
    function isValidPhone(phone) {
        const re = /^[0-9\-+\s()]*$/;
        return re.test(phone);
    }
    
    // Update file name display
    function updateFileName(event, inputId) {
        const fileName = event.target.files.length > 0 
            ? event.target.files[0].name 
            : 'No file chosen' + (inputId === 'cv-upload' ? ' (PDF/DOC/DOCX, Max 5MB)' : '');
            
        const fileLabel = document.querySelector(`label[for="${inputId}"] .file-name`);
        if (fileLabel) {
            fileLabel.textContent = fileName;
        }
    }
});



  // Global variables for job details
  let jobDetails = null;
        
  document.addEventListener('DOMContentLoaded', function () {
      // Form Navigation
      const form = document.getElementById('jobApplicationForm');
      const steps = document.querySelectorAll('.form-step');
      const nextBtns = document.querySelectorAll('.btn-next');
      const prevBtns = document.querySelectorAll('.btn-prev');
      const progressSteps = document.querySelectorAll('.step');
      
      // Get job details from URL
      const urlParams = new URLSearchParams(window.location.search);
      const jobTitle = decodeURIComponent(urlParams.get('jobTitle') || '');
      
      // Find job in mockup data
      if (window.mockupData && jobTitle) {
          // Flatten all jobs from all categories
          const allJobs = window.mockupData.flatMap(category => category.jobs || []);
          // Find the job by title (case insensitive)
          jobDetails = allJobs.find(job => 
              job.title.toLowerCase() === jobTitle.toLowerCase()
          );
          
          if (jobDetails) {
              document.getElementById('position').value = jobDetails.title;
              
              // Update page title
              document.title = `${jobDetails.title} - GCS Careers`;
              
              // Display job details if jobContent element exists
              const jobContent = document.getElementById('jobContent');
              if (jobContent) {
                  // Format job description with line breaks
                  const formattedDescription = jobDetails.description
                      ? jobDetails.description.replace(/\n/g, '<br>')
                      : 'No description available.';

                  // Function to create list items from array
                  const createListItems = (items) => {
                      if (!items || !items.length) return '<p>Not specified.</p>';
                      return '<ul class="job-detail-list">' +
                          items.map(item => `<li>${item}</li>`).join('') +
                          '</ul>';
                  };

                  // Update job content
                  jobContent.innerHTML = `
                      <div class="job-section">
                          <h3>Job Description</h3>
                          <div class='text-black job-description'>${formattedDescription}</div>
                      </div>
                      
                      <div class="job-section">
                          <h3>Qualifications</h3>
                          <div class="text-black job-detail-content">
                              ${jobDetails.qualifications ? createListItems(jobDetails.qualifications) : '<p>No specific qualifications mentioned.</p>'}
                          </div>
                      </div>

                      <div class="job-section">
                          <h3>Application Instructions</h3>
                          <div class="text-black job-detail-content">
                              ${jobDetails.applicationInstructions ? createListItems(jobDetails.applicationInstructions) : '<p>No specific application instructions provided.</p>'}
                          </div>
                      </div>
                      
                      <div class="job-section">
                          <h3>Experience</h3>
                          <div class="text-black job-detail-content">
                              ${jobDetails.experience ? createListItems(jobDetails.experience) : '<p>Experience requirements not specified.</p>'}
                          </div>
                      </div>
                      
                      <div class="job-section">
                          <h3>Benefits</h3>
                          <div class="text-black job-detail-content">
                              ${jobDetails.benefits ? createListItems(jobDetails.benefits) : '<p>Benefits information not available.</p>'}
                          </div>
                      </div>
                  `;
              }
          }
      }

      // Next button click handler
      nextBtns.forEach(btn => {
          btn.addEventListener('click', function() {
              const currentStep = this.closest('.form-step');
              const nextStepId = this.dataset.next;
              const nextStep = document.getElementById(`step-${nextStepId}`);
              
              // Validate current step
              if (validateStep(currentStep)) {
                  // Update progress steps
                  updateProgress(nextStepId);
                  
                  // Hide current step and show next
                  currentStep.classList.remove('active');
                  currentStep.classList.add('d-none');
                  nextStep.classList.remove('d-none');
                  nextStep.classList.add('active');
                  
                  // Scroll to top of form
                  nextStep.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
          });
      });
      
      // Previous button click handler
      prevBtns.forEach(btn => {
          btn.addEventListener('click', function() {
              const currentStep = this.closest('.form-step');
              const prevStepId = this.dataset.prev;
              const prevStep = document.getElementById(`step-${prevStepId}`);
              
              // Update progress steps
              updateProgress(prevStepId);
              
              // Hide current step and show previous
              currentStep.classList.remove('active');
              currentStep.classList.add('d-none');
              prevStep.classList.remove('d-none');
              prevStep.classList.add('active');
              
              // Scroll to top of form
              prevStep.scrollIntoView({ behavior: 'smooth', block: 'start' });
          });
      });
      
      // Update progress indicator
      function updateProgress(stepNumber) {
          progressSteps.forEach((step, index) => {
              if (index < stepNumber) {
                  step.classList.add('completed');
                  step.classList.add('active');
              } else if (index === (stepNumber - 1)) {
                  step.classList.add('active');
                  step.classList.remove('completed');
              } else {
                  step.classList.remove('active', 'completed');
              }
          });
      }
      
      // Validate current step
      function validateStep(step) {
          const inputs = step.querySelectorAll('input[required], select[required]');
          let isValid = true;
          
          inputs.forEach(input => {
              if (!input.value.trim()) {
                  input.classList.add('is-invalid');
                  isValid = false;
              } else {
                  input.classList.remove('is-invalid');
              }
              
              // Email validation
              if (input.type === 'email' && input.value) {
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (!emailRegex.test(input.value)) {
                      input.classList.add('is-invalid');
                      isValid = false;
                  }
              }
              
              // Phone number validation (basic)
              if (input.type === 'tel' && input.value) {
                  const phoneRegex = /^[0-9\-+\s()]*$/;
                  if (!phoneRegex.test(input.value)) {
                      input.classList.add('is-invalid');
                      isValid = false;
                  }
              }
          });
          
          return isValid;
      }
      
      // File upload preview
      const fileInputs = document.querySelectorAll('input[type="file"]');
      fileInputs.forEach(input => {
          input.addEventListener('change', function() {
              const fileName = this.files[0] ? this.files[0].name : 'No file chosen';
              const fileLabel = this.previousElementSibling.querySelector('.file-name');
              if (fileLabel) {
                  fileLabel.textContent = fileName;
              }
          });
      });
      
      // Form submission
      form.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Validate all steps before submission
          let allValid = true;
          steps.forEach(step => {
              if (!validateStep(step) && !step.classList.contains('d-none')) {
                  allValid = false;
              }
          });
          
          if (allValid) {
              // Here you would typically send the form data to a server
              alert('Application submitted successfully!');
              form.reset();
              
              // Reset form to first step
              steps.forEach((step, index) => {
                  if (index === 0) {
                      step.classList.remove('d-none');
                      step.classList.add('active');
                  } else {
                      step.classList.add('d-none');
                      step.classList.remove('active');
                  }
              });
              
              // Reset progress steps
              updateProgress(1);
              
              // Scroll to top
              window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
              alert('Please fill in all required fields correctly.');
          }
      });
      const jobId = urlParams.get('jobId') || '';

      // Find the job details from mockupData
      let jobDetails = null;
      if (window.parent.mockupData) {
          for (const category of window.parent.mockupData) {
              const job = category.jobs.find(j => j.title === jobTitle);
              if (job) {
                  jobDetails = job;
                  break;
              }
          }
      }

      // Update the page with job details
      document.title = `${jobTitle} - GCS Careers`;
      document.getElementById('jobTitle').textContent = jobTitle;

      // Display job tags if available
      const jobMeta = document.getElementById('jobMeta');
      jobMeta.innerHTML = ''; // Clear any existing tags

      if (jobDetails && jobDetails.tags) {
          jobDetails.tags.forEach(tag => {
              const tagElement = document.createElement('span');
              tagElement.className = 'job-tag';
              tagElement.textContent = tag;
              jobMeta.appendChild(tagElement);
          });
      }

      // Format job description with line breaks
      const formattedDescription = jobDetails.description
          ? jobDetails.description.replace(/\n/g, '')
          : 'No description available.';

      // Function to create list items from array
      const createListItems = (items) => {
          if (!items || !items.length) return '<p>Not specified.</p>';
          return '<ul class="job-detail-list">' +
              items.map(item => `<li>${item}</li>`).join('') +
              '</ul>';
      };

      // File upload handler
      document.getElementById('cv-upload').addEventListener('change', function(e) {
          const fileName = e.target.files[0] ? e.target.files[0].name : 'No file chosen';
          document.querySelector('.file-name').textContent = fileName;
      });


      // Set up apply now button
      // const applyButton = document.getElementById('applyNowBtn');
      // applyButton.addEventListener('click', function(e) {
      //     e.preventDefault();
      //     // In a real app, this would open an application form or redirect to application page
      //     alert(`Application form for "${jobTitle}" will open here.`);
      //     // To implement later: window.location.href = `apply.html?job=${encodeURIComponent(jobTitle)}`;
      // });

      // Add back to top button functionality
      const backToTopButton = document.getElementById('backToTop');
      if (backToTopButton) {
          backToTopButton.addEventListener('click', () => {
              window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
              });
          });

          // Show/hide back to top button based on scroll position
          window.addEventListener('scroll', () => {
              if (window.pageYOffset > 300) {
                  backToTopButton.style.display = 'block';
              } else {
                  backToTopButton.style.display = 'none';
              }
          });
      }
  });