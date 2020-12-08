(function () {
    "use strict";

    angular
      .module("mathbirthdays.module", [
        /*
         * 3rd Party modules
         */
        "toastr",
      ])
      .controller("mathBirthdaysCtrl", mathBirthdaysCtrl);

    mathBirthdaysCtrl.$inject = ["$timeout", "toastr"];
    function mathBirthdaysCtrl($timeout, toastr) {
      var vm = this;

      vm.month = "June";
      vm.day = "14";
      vm.year1 = "19";
      vm.year2 = "50";

      vm.nameMonth = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      vm.optionMonth = false;
      vm.indexOptionMonth = 5;

      vm.days = [];
      vm.optionDays = false;
      vm.indexOptionDays = 13;

      vm.years1 = [18, 19, 20];
      vm.optionYear1 = false;
      vm.indexOptionYear1 = 1;

      vm.years2 = [];
      vm.optionYear2 = false;
      vm.indexOptionYear2 = 50;

      vm.calcMathBirthday = calcMathBirthday;
      vm.activeOptionMonth = activeOptionMonth;
      vm.desactiveOptionMonth = desactiveOptionMonth;
      vm.activeOptionDays = activeOptionDays;
      vm.desactiveOptionDays = desactiveOptionDays;
      vm.activeOptionYear1 = activeOptionYear1;
      vm.desactiveOptionYear1 = desactiveOptionYear1;
      vm.activeOptionYear2 = activeOptionYear2;
      vm.desactiveOptionYear2 = desactiveOptionYear2;

      vm.swiper1 = new Swiper(".swiper1", {});
      vm.swiper2 = new Swiper(".swiper2", {});
      vm.swiper3 = new Swiper(".swiper3", {});
      vm.swiper4 = new Swiper(".swiper4", {});

      function activeOptionMonth() {
        vm.optionMonth = true;
        $timeout(function () {
          vm.swiper1 = new Swiper(".swiper1", {
            slidesPerView: 1,
            spaceBetween: 0,
            mousewheelControl: true,
            keyboardControl: true,
            nextButton: ".swiper-button-next",
            prevButton: ".swiper-button-prev",
          });
          $timeout(function () {
            vm.swiper1.slideTo(vm.indexOptionMonth, 0, true);
          });
        });
      }

      function desactiveOptionMonth() {
        vm.optionMonth = false;
        vm.indexOptionMonth = vm.swiper1.activeIndex;
        vm.month = vm.nameMonth[vm.swiper1.activeIndex];
      }

      function activeOptionDays() {
        vm.optionDays = true;
        $timeout(function () {
          vm.swiper2 = new Swiper(".swiper2", {
            slidesPerView: 1,
            spaceBetween: 0,
            mousewheelControl: true,
            keyboardControl: true,
            nextButton: ".swiper-button-next",
            prevButton: ".swiper-button-prev",
          });
          $timeout(function () {
            vm.swiper2.slideTo(vm.indexOptionDays, 0, true);
          });
        });
      }

      function desactiveOptionDays() {
        vm.optionDays = false;
        vm.indexOptionDays = vm.swiper2.activeIndex;
        vm.day = vm.days[vm.swiper2.activeIndex];
      }

      function activeOptionYear1() {
        vm.optionYear1 = true;
        $timeout(function () {
          vm.swiper3 = new Swiper(".swiper3", {
            slidesPerView: 1,
            spaceBetween: 0,
            mousewheelControl: true,
            keyboardControl: true,
            nextButton: ".swiper-button-next",
            prevButton: ".swiper-button-prev",
          });
          $timeout(function () {
            vm.swiper3.slideTo(vm.indexOptionYear1, 0, true);
          });
        });
      }

      function desactiveOptionYear1() {
        vm.optionYear1 = false;
        vm.indexOptionYear1 = vm.swiper3.activeIndex;
        vm.year1 = vm.years1[vm.swiper3.activeIndex];
      }

      function activeOptionYear2() {
        vm.optionYear2 = true;
        $timeout(function () {
          vm.swiper4 = new Swiper(".swiper4", {
            slidesPerView: 1,
            spaceBetween: 0,
            mousewheelControl: true,
            keyboardControl: true,
            nextButton: ".swiper-button-next",
            prevButton: ".swiper-button-prev",
          });
          $timeout(function () {
            vm.swiper4.slideTo(vm.indexOptionYear2, 0, true);
          });
        });
      }

      function desactiveOptionYear2() {
        vm.optionYear2 = false;
        vm.indexOptionYear2 = vm.swiper4.activeIndex;
        vm.year2 = vm.years2[vm.swiper4.activeIndex];
      }

      function calcMathBirthday() {
        var date =
          vm.year1 + vm.year2 + "-" + getMonth(vm.month) + "-" + vm.day;

        var birthdate = moment(date);

        var compareDate = moment();

        var flat = true;
        var compareBirthdate = birthdate;
        var mathBirthday = 1;
        var days = 0;

        while (flat) {
          days = Math.pow(10, mathBirthday);
          compareBirthdate.add(days, "days");
          if (compareBirthdate.isAfter(compareDate)) {
            var dif = compareBirthdate.diff(compareDate, "days");
            toastr.success(
              "",
              "Your next math birthday is your 10-day-old birthday is the " +
                compareBirthdate.format("LL") +
                " on  " +
                (dif + 1) +
                " days from now",
              {
                closeButton: true,
              }
            );
            flat = false;
          } else {
            compareBirthdate = birthdate;
            days = 0;
            mathBirthday++;
          }
        }
      }

      function getMonth(month) {
        var numMonth = "";
        for (var i = 0; i < vm.nameMonth.length; i++) {
          if (vm.nameMonth[i] === month) {
            numMonth = i + 1;
            if (i <= 9) numMonth = "0" + (i + 1);
            else numMonth = i + 1;
            break;
          }
        }
        return numMonth;
      }

      fillDays();
      function fillDays() {
        for (var i = 1; i <= 31; i++) {
          if (i < 10) vm.days.push("0" + i);
          else vm.days.push(i.toString());
        }
      }

      fillYear2();
      function fillYear2() {
        for (var i = 0; i <= 99; i++) {
          if (i < 10) vm.years2.push("0" + i);
          else vm.years2.push(i.toString());
        }
      }
    }
  })();